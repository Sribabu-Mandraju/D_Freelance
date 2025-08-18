import { useEffect, useState, useRef } from "react";
import { useAccount, useSignMessage, useSwitchChain } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import {
  verifyWalletAuth,
  logout,
  validateStoredToken,
} from "../../store/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";

function WalletConnect({ onAuthSuccess }) {
  const { address, isConnected, chain, status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { switchChain } = useSwitchChain();
  const [authStatus, setAuthStatus] = useState(null);
  const [chainError, setChainError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Use refs to track previous values and prevent unnecessary re-authentication
  const prevAddressRef = useRef(null);
  const prevChainRef = useRef(null);
  const hasAuthenticatedRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Initialize authentication state on mount
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      console.log("Initializing authentication state...");

      // Try to restore authentication from stored data
      const storedToken = localStorage.getItem("authToken");
      const storedAddress = localStorage.getItem("authAddress");

      if (storedToken && storedAddress) {
        console.log("Found stored authentication data, validating...");
        dispatch(validateStoredToken()).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            console.log("Stored token validated successfully");
            hasAuthenticatedRef.current = true;
            // Call onAuthSuccess with stored data
            onAuthSuccess(
              result.payload.token,
              result.payload.userExists,
              result.payload.user
            );
          } else {
            console.log(
              "Stored token validation failed, will require re-authentication"
            );
          }
        });
      }
    }
  }, [dispatch, onAuthSuccess]);

  useEffect(() => {
    console.log("useEffect triggered", {
      status,
      isConnected,
      address,
      chain: chain?.id,
      authState: authState.isAuthenticated,
      hasAuthenticated: hasAuthenticatedRef.current,
    });

    const authenticate = async () => {
      // Don't authenticate if already in process
      if (isAuthenticating) {
        console.log("Authentication already in progress, skipping...");
        return;
      }

      // Don't authenticate if wallet is not connected
      if (!isConnected || !address || status !== "connected") {
        console.log("Wallet not connected or wrong status", {
          status,
          isConnected,
          address,
        });
        setAuthStatus("Please connect your wallet");
        return;
      }

      // Check if we already have a valid token for this address
      const existingToken = localStorage.getItem("authToken");
      const existingAddress = localStorage.getItem("authAddress");

      if (
        existingToken &&
        existingAddress === address &&
        authState.isAuthenticated
      ) {
        console.log("Already authenticated with valid token for this address");
        hasAuthenticatedRef.current = true;
        return;
      }

      // Check if address or chain has actually changed
      const addressChanged = prevAddressRef.current !== address;
      const chainChanged = prevChainRef.current !== chain?.id;

      if (!addressChanged && !chainChanged && hasAuthenticatedRef.current) {
        console.log("No changes detected, skipping re-authentication");
        return;
      }

      // Check chain compatibility
      if (chain && ![base.id, baseSepolia.id].includes(chain.id)) {
        console.log("Invalid chain detected", { chainId: chain?.id });
        setChainError("Please switch to Base Mainnet or Base Sepolia");
        try {
          console.log("Attempting to switch to Base Sepolia");
          await switchChain({ chainId: baseSepolia.id });
          console.log("Switched to Base Sepolia");
          // Wait a bit for chain switch to complete
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error("Chain switch error:", error);
          setChainError(`Failed to switch chain: ${error.message}`);
          return;
        }
      }
      setChainError(null);

      setIsAuthenticating(true);
      try {
        console.log("Fetching nonce for address:", address);
        const nonceResponse = await fetch(
          "http://localhost:3001/api/auth/get-nonce",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
          }
        );
        console.log(
          "Nonce response status:",
          nonceResponse.status,
          nonceResponse.statusText
        );
        if (!nonceResponse.ok) {
          throw new Error(`Nonce request failed: ${nonceResponse.statusText}`);
        }
        const { success, nonce, message } = await nonceResponse.json();
        console.log("Nonce response data:", { success, nonce, message });
        if (!success) {
          setAuthStatus(message || "Failed to get nonce");
          return;
        }

        console.log("Requesting signature for nonce:", nonce);
        const signature = await signMessageAsync({ message: nonce });
        console.log("Signature obtained:", signature);

        console.log("Verifying signature");

        const resultAction = await dispatch(
          verifyWalletAuth({ address, signature, nonce })
        );
        const verifyResult = resultAction.payload;
        if (verifyResult?.token) {
          setAuthStatus("Authentication successful");
          hasAuthenticatedRef.current = true;

          // Store authentication data
          localStorage.setItem("authToken", verifyResult.token);
          localStorage.setItem("authAddress", address);

          onAuthSuccess(
            verifyResult.token,
            verifyResult.userExists,
            verifyResult.user
          );
        } else {
          setAuthStatus("Authentication failed");
          hasAuthenticatedRef.current = false;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthStatus(`Authentication failed: ${error.message}`);
        hasAuthenticatedRef.current = false;
      } finally {
        setIsAuthenticating(false);
      }
    };

    // Only authenticate if we have all required data
    if (status === "connected" && isConnected && address) {
      // Check if we're already authenticated with this wallet
      const storedToken = localStorage.getItem("authToken");
      const storedAddress = localStorage.getItem("authAddress");

      if (
        storedToken &&
        storedAddress === address &&
        authState.isAuthenticated
      ) {
        console.log("Already authenticated with this wallet, skipping...");
        hasAuthenticatedRef.current = true;
        return;
      }

      authenticate();
    }

    // Update refs after processing
    prevAddressRef.current = address;
    prevChainRef.current = chain?.id;
  }, [
    isConnected,
    address,
    chain,
    status,
    signMessageAsync,
    switchChain,
    onAuthSuccess,
    authState.isAuthenticated,
    isAuthenticating,
  ]);

  // Clear auth state when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      dispatch(logout());
      setAuthStatus("Please connect your wallet");
      hasAuthenticatedRef.current = false;
      hasInitializedRef.current = false;
      // Clear stored auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("authAddress");
    }
  }, [isConnected, dispatch]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Reset refs on unmount
      hasAuthenticatedRef.current = false;
      hasInitializedRef.current = false;
    };
  }, []);

  return (
    <div>
      {/* <h2>Connect Wallet</h2> */}
      <w3m-button />
      {chainError && <p style={{ color: "red" }}>{chainError}</p>}
      {/* {authStatus && <p>{authStatus}</p>} */}
    </div>
  );
}

export default WalletConnect;

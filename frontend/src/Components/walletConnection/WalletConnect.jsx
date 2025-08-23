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
    // Only run when wallet connection or address changes
    if (!isConnected || !address || status !== "connected") return;

    // Only authenticate if not already authenticated for this address
    const storedToken = localStorage.getItem("authToken");
    const storedAddress = localStorage.getItem("authAddress");
    if (storedToken && storedAddress === address && authState.isAuthenticated) {
      hasAuthenticatedRef.current = true;
      return;
    }

    if (hasAuthenticatedRef.current) return;

    // Chain check
    if (chain && ![base.id, baseSepolia.id].includes(chain.id)) {
      setChainError("Please switch to Base Mainnet or Base Sepolia");
      return;
    }
    setChainError(null);

    const authenticate = async () => {
      setIsAuthenticating(true);
      try {
        const nonceResponse = await fetch(
          "http://localhost:3001/api/auth/get-nonce",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
          }
        );
        if (!nonceResponse.ok) {
          setAuthStatus("Failed to get nonce");
          return;
        }
        const { success, nonce, message } = await nonceResponse.json();
        if (!success) {
          setAuthStatus(message || "Failed to get nonce");
          return;
        }
        const signature = await signMessageAsync({ message: nonce });
        const resultAction = await dispatch(
          verifyWalletAuth({ address, signature, nonce })
        );
        const verifyResult = resultAction.payload;
        if (verifyResult?.token) {
          setAuthStatus("Authentication successful");
          hasAuthenticatedRef.current = true;
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
        setAuthStatus(`Authentication failed: ${error.message}`);
        hasAuthenticatedRef.current = false;
      } finally {
        setIsAuthenticating(false);
      }
    };
    authenticate();
    prevAddressRef.current = address;
    prevChainRef.current = chain?.id;
  }, [isConnected, address, chain, status, authState.isAuthenticated]);

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

import { useEffect, useState } from 'react';
import { useAccount, useSignMessage, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { verifyWalletAuth } from '../../store/authSlice/authSlice';
import { useDispatch } from 'react-redux';

function WalletConnect({ onAuthSuccess }) {
  const { address, isConnected, chain, status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { switchChain } = useSwitchChain();
  const [authStatus, setAuthStatus] = useState(null);
  const [chainError, setChainError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect triggered', { status, isConnected, address, chain: chain?.id });
    const authenticate = async () => {
      console.log('Starting authentication process');
      if (!isConnected || !address) {
        console.log('Wallet not connected', { status, isConnected, address });
        setAuthStatus('Please connect your wallet');
        return;
      }

      if (chain && ![base.id, baseSepolia.id].includes(chain.id)) {
        console.log('Invalid chain detected', { chainId: chain?.id });
        setChainError('Please switch to Base Mainnet or Base Sepolia');
        try {
          console.log('Attempting to switch to Base Sepolia');
          await switchChain({ chainId: baseSepolia.id });
          console.log('Switched to Base Sepolia');
        } catch (error) {
          console.error('Chain switch error:', error);
          setChainError(`Failed to switch chain: ${error.message}`);
          return;
        }
      }
      setChainError(null);

      try {
        console.log('Fetching nonce for address:', address);
        const nonceResponse = await fetch('http://localhost:3001/api/auth/get-nonce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address }),
        });
        console.log('Nonce response status:', nonceResponse.status, nonceResponse.statusText);
        if (!nonceResponse.ok) {
          throw new Error(`Nonce request failed: ${nonceResponse.statusText}`);
        }
        const { success, nonce, message } = await nonceResponse.json();
        console.log('Nonce response data:', { success, nonce, message });
        if (!success) {
          setAuthStatus(message || 'Failed to get nonce');
          return;
        }

        console.log('Requesting signature for nonce:', nonce);
        const signature = await signMessageAsync({ message: nonce });
        console.log('Signature obtained:', signature);

        console.log('Verifying signature');

        const resultAction = await dispatch(
          verifyWalletAuth({ address, signature, nonce })
        );
        const verifyResult = resultAction.payload;
        if (verifyResult?.token) {
          setAuthStatus('Authentication successful');
          onAuthSuccess(
            verifyResult.token,
            verifyResult.userExists,
            verifyResult.user
          );
        } else {
          setAuthStatus('Authentication failed');
        }
      }
      //   const verifyResponse = await fetch('http://localhost:3001/api/auth/verify', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ address, signature, nonce }),
      //   });
      //   console.log('Verify response status:', verifyResponse.status, verifyResponse.statusText);
      //   if (!verifyResponse.ok) {
      //     throw new Error(`Verify request failed: ${verifyResponse.statusText}`);
      //   }
      //   const verifyResult = await verifyResponse.json();
      //   console.log('Verify response data:', verifyResult);

      //   if (verifyResult.success) {
      //     console.log('Authentication successful, storing JWT');
      //     setAuthStatus('Authentication successful');
      //     localStorage.setItem('authToken', verifyResult.token); // Store JWT
      //     onAuthSuccess(verifyResult.token, verifyResult.userExists, verifyResult.user);
      //   } else {
      //     setAuthStatus(verifyResult.message || 'Authentication failed');
      //   }
      // } 
      catch (error) {
        console.error('Authentication error:', error);
        setAuthStatus(`Authentication failed: ${error.message}`);
      }
    };

    authenticate();
  }, [isConnected, address, chain, status, signMessageAsync, switchChain, onAuthSuccess]);

  return (
    <div>
      {/* <h2>Connect Wallet</h2> */}
      <w3m-button />
      {chainError && <p style={{ color: 'red' }}>{chainError}</p>}
      {/* {authStatus && <p>{authStatus}</p>} */}
    </div>
  );
}

export default WalletConnect;
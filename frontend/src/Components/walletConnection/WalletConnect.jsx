import { useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Optional: for RainbowKit comparison

function WalletConnect({ onAuthSuccess }) {
  const { address, isConnected, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [authStatus, setAuthStatus] = useState(null);
  const [chainError, setChainError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      if (!isConnected || !address) return;

      // Validate chain
      if (chain && ![base.id, baseSepolia.id].includes(chain.id)) {
        setChainError('Please switch to Base Mainnet or Base Sepolia');
        return;
      }
      setChainError(null);

      try {
        alert("triggering api call")
        const nonceResponse = await fetch('http://localhost:3001/api/auth/get-nonce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address }),
        });
        const { success, nonce, message } = await nonceResponse.json();
        if (!success) {
          setAuthStatus(message || 'Failed to get nonce');
          return;
        }

        const signature = await signMessageAsync({ message: nonce });

        const verifyResponse = await fetch('http://localhost:3001/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, signature, nonce }),
        });
        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          setAuthStatus('Authentication successful');
          onAuthSuccess(verifyResult.token, verifyResult.userExists, verifyResult.user);
        } else {
          setAuthStatus(verifyResult.message || 'Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setAuthStatus('Authentication failed');
      }
    };

    authenticate();
  }, [isConnected, address, chain, signMessageAsync, onAuthSuccess]);

  return (
    <div>
      <h2>Connect Wallet</h2>
      {/* Use w3m-button for Web3Modal */}
      <w3m-button />
      {chainError && <p style={{ color: 'red' }}>{chainError}</p>}
      {authStatus && <p>{authStatus}</p>}
      {/* Optional: Uncomment to test RainbowKit instead */}
      {/* <ConnectButton /> */}
    </div>
  );
}

export default WalletConnect;
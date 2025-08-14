import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet, safe } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';

const projectId = 'ca703cec4e1cc82b7e8a1342fed93c90'; // Your WalletConnect project ID

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected({ target: 'metaMask' }), // MetaMask and other injected wallets
    walletConnect({ projectId, showQrModal: false }), // WalletConnect (QR code handled by Web3Modal)
    coinbaseWallet({ appName: 'My Web3 Dapp', darkMode: true }),
    safe({ appName: 'My Web3 Dapp' }), // Safe wallet (if applicable)
  ],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_MAINNET || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(import.meta.env.VITE_BASE_SEPOLIA || 'https://base-sepolia.g.alchemy.com/v2/lzIxPpJ8bHtK938K6Bnet'),
  },
});

// Initialize Web3Modal for wallet selection
createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#007bff',
    '--w3m-border-radius': '8px',
  },
  // Optionally customize wallet display
  defaultChain: baseSepolia, // Default to Base Sepolia for testing
  enableAnalytics: true, // Optional: enable analytics
});
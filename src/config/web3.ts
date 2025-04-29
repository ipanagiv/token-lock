import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// Supported chain IDs
const supportedChainIds = [11155111]; // Sepolia testnet

// MetaMask connector
export const injected = new InjectedConnector({
  supportedChainIds,
});

// WalletConnect connector
export const walletconnect = new WalletConnectConnector({
  rpc: {
    11155111: process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA || 'https://sepolia.infura.io/v3/your-project-id',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

// Contract addresses
export const CONTRACT_ADDRESSES = {
  TOKEN: '0x2d9D5aD216747Fa621e52b74E95B5fD128D4cee2',
  LOCK: '0x012b41f56474d191d4784137DA2740f8a490Fb11',
};

// Network names
export const NETWORK_NAMES = {
  11155111: 'Sepolia Testnet',
};

// Etherscan URLs for transaction links
export const ETHERSCAN_URLS = {
  11155111: 'https://sepolia.etherscan.io',
}; 
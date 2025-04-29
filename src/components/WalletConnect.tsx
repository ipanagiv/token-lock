import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../config/web3';
import { NETWORK_NAMES } from '../config/web3';

const WalletConnect = () => {
  const { active, account, activate, deactivate, chainId } = useWeb3React();

  const connectMetaMask = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      await activate(walletconnect);
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {!active ? (
        <div className="flex space-x-4">
          <button
            onClick={connectMetaMask}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect MetaMask
          </button>
          <button
            onClick={connectWalletConnect}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect WalletConnect
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <div className="text-sm">
            Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
          <div className="text-sm">
            Network: {chainId ? NETWORK_NAMES[chainId] : 'Unknown'}
          </div>
          <button
            onClick={disconnect}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 
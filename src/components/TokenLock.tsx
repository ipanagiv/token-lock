import { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const TokenLock = () => {
  const {
    tokenBalance,
    lockedBalance,
    totalLocked,
    unlockTime,
    isLoading,
    error,
    lockTokens,
    unlockTokens,
  } = useWeb3();

  const [lockAmount, setLockAmount] = useState('');
  const [unlockAmount, setUnlockAmount] = useState('');

  const handleLock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lockAmount) return;
    await lockTokens(lockAmount);
    setLockAmount('');
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockAmount) return;
    await unlockTokens(unlockAmount);
    setUnlockAmount('');
  };

  const canUnlock = unlockTime > 0 && Date.now() / 1000 >= unlockTime;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Token Balance</h3>
          <p className="text-2xl font-bold text-blue-600">{tokenBalance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Locked Balance</h3>
          <p className="text-2xl font-bold text-blue-600">{lockedBalance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Locked</h3>
          <p className="text-2xl font-bold text-blue-600">{totalLocked}</p>
        </div>
      </div>

      {/* Lock Form */}
      <form onSubmit={handleLock} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Lock Tokens</h2>
        <div className="flex space-x-4">
          <input
            type="number"
            value={lockAmount}
            onChange={(e) => setLockAmount(e.target.value)}
            placeholder="Amount to lock"
            className="flex-1 p-2 border rounded"
            step="0.000000000000000001"
          />
          <button
            type="submit"
            disabled={isLoading || !lockAmount}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? 'Locking...' : 'Lock'}
          </button>
        </div>
      </form>

      {/* Unlock Form */}
      <form onSubmit={handleUnlock} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Unlock Tokens</h2>
        <div className="flex space-x-4">
          <input
            type="number"
            value={unlockAmount}
            onChange={(e) => setUnlockAmount(e.target.value)}
            placeholder="Amount to unlock"
            className="flex-1 p-2 border rounded"
            step="0.000000000000000001"
          />
          <button
            type="submit"
            disabled={isLoading || !unlockAmount || !canUnlock}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? 'Unlocking...' : 'Unlock'}
          </button>
        </div>
        {!canUnlock && unlockTime > 0 && (
          <p className="mt-2 text-sm text-red-600">
            Unlock available in {Math.ceil((unlockTime - Date.now() / 1000) / 86400)} days
          </p>
        )}
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default TokenLock; 
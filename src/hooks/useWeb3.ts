import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, ETHERSCAN_URLS } from '../config/web3';

// ABI for the token contract (replace with your actual ABI)
const TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

// ABI for the lock contract (replace with your actual ABI)
const LOCK_ABI = [
  'function lock(uint256 amount) returns (bool)',
  'function unlock(uint256 amount) returns (bool)',
  'function getLockedBalance(address account) view returns (uint256)',
  'function getTotalLocked() view returns (uint256)',
  'function getUnlockTime(address account) view returns (uint256)',
];

export const useWeb3 = () => {
  const { account, library, chainId } = useWeb3React();
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [lockedBalance, setLockedBalance] = useState<string>('0');
  const [totalLocked, setTotalLocked] = useState<string>('0');
  const [unlockTime, setUnlockTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const tokenContract = library
    ? new ethers.Contract(CONTRACT_ADDRESSES.TOKEN, TOKEN_ABI, library)
    : null;

  const lockContract = library
    ? new ethers.Contract(CONTRACT_ADDRESSES.LOCK, LOCK_ABI, library)
    : null;

  const fetchBalances = useCallback(async () => {
    if (!account || !tokenContract || !lockContract) return;

    try {
      const [tokenBal, lockedBal, totalLockedBal, unlockTimeStamp] = await Promise.all([
        tokenContract.balanceOf(account),
        lockContract.getLockedBalance(account),
        lockContract.getTotalLocked(),
        lockContract.getUnlockTime(account),
      ]);

      setTokenBalance(ethers.utils.formatEther(tokenBal));
      setLockedBalance(ethers.utils.formatEther(lockedBal));
      setTotalLocked(ethers.utils.formatEther(totalLockedBal));
      setUnlockTime(unlockTimeStamp.toNumber());
    } catch (err) {
      console.error('Error fetching balances:', err);
      setError('Failed to fetch balances');
    }
  }, [account, tokenContract, lockContract]);

  const lockTokens = async (amount: string) => {
    if (!account || !tokenContract || !lockContract) return;

    try {
      setIsLoading(true);
      setError('');

      const amountWei = ethers.utils.parseEther(amount);
      
      // Check allowance
      const allowance = await tokenContract.allowance(account, CONTRACT_ADDRESSES.LOCK);
      
      if (allowance.lt(amountWei)) {
        // Approve tokens first
        const approveTx = await tokenContract.approve(CONTRACT_ADDRESSES.LOCK, amountWei);
        await approveTx.wait();
      }

      // Lock tokens
      const tx = await lockContract.lock(amountWei);
      await tx.wait();

      await fetchBalances();
    } catch (err) {
      console.error('Error locking tokens:', err);
      setError('Failed to lock tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const unlockTokens = async (amount: string) => {
    if (!account || !lockContract) return;

    try {
      setIsLoading(true);
      setError('');

      const amountWei = ethers.utils.parseEther(amount);
      const tx = await lockContract.unlock(amountWei);
      await tx.wait();

      await fetchBalances();
    } catch (err) {
      console.error('Error unlocking tokens:', err);
      setError('Failed to unlock tokens');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh balances every 10 seconds
  useEffect(() => {
    if (account) {
      fetchBalances();
      const interval = setInterval(fetchBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [account, fetchBalances]);

  return {
    account,
    chainId,
    tokenBalance,
    lockedBalance,
    totalLocked,
    unlockTime,
    isLoading,
    error,
    lockTokens,
    unlockTokens,
    fetchBalances,
    getEtherscanUrl: (txHash: string) => 
      chainId ? `${ETHERSCAN_URLS[chainId]}/tx/${txHash}` : '',
  };
}; 
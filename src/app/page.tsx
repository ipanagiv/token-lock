'use client';

import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import WalletConnect from '../components/WalletConnect';
import TokenLock from '../components/TokenLock';
import TransactionHistory from '../components/TransactionHistory';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

export default function Home() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Token Lock DApp</h1>
          <WalletConnect />
          <TokenLock />
          <TransactionHistory />
        </div>
      </main>
    </Web3ReactProvider>
  );
}

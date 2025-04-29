import { useEffect, useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

interface Transaction {
  type: 'lock' | 'unlock';
  amount: string;
  timestamp: number;
  hash: string;
}

const TransactionHistory = () => {
  const { account, getEtherscanUrl } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // In a real application, you would fetch transactions from an API or blockchain
    // This is a placeholder for demonstration
    const fetchTransactions = async () => {
      if (!account) return;
      
      // Example transactions (replace with actual data fetching)
      const mockTransactions: Transaction[] = [
        {
          type: 'lock',
          amount: '100',
          timestamp: Date.now() - 86400000, // 1 day ago
          hash: '0x123...',
        },
        {
          type: 'unlock',
          amount: '50',
          timestamp: Date.now() - 172800000, // 2 days ago
          hash: '0x456...',
        },
      ];

      setTransactions(mockTransactions);
    };

    fetchTransactions();
  }, [account]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!account) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tx.type === 'lock'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tx.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(tx.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={getEtherscanUrl(tx.hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory; 
# Token Lock DApp

A decentralized application for locking and unlocking ERC20 tokens on the Ethereum Sepolia testnet.

## Features

- Connect wallet using MetaMask or WalletConnect
- View token balances (available, locked, and total locked)
- Lock tokens with approval flow
- Unlock tokens after cooldown period
- View transaction history with Etherscan links
- Auto-refresh balances every 10 seconds

## Contract Addresses (Sepolia Testnet)

- Token Contract: `0x2d9D5aD216747Fa621e52b74E95B5fD128D4cee2`
- Lock Contract: `0x012b41f56474d191d4784137DA2740f8a490Fb11`

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/token-lock-dapp.git
cd token-lock-dapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Infura project ID:
```
NEXT_PUBLIC_RPC_URL_SEPOLIA=https://sepolia.infura.io/v3/your-project-id
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Requirements

- Node.js 18.x or later
- MetaMask or a WalletConnect compatible wallet
- Some Sepolia testnet ETH for gas fees

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- ethers.js
- Web3-React
- WalletConnect

## License

MIT

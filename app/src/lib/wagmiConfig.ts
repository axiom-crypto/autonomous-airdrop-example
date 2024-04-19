import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

const metadata = {
  name: 'Autonomous Airdrop Example | Axiom',
  description: 'Autonomous Airdrop Example using Axiom',
  url: '', // origin must match your domain & subdomain
  icons: [''],
}

export const wagmiConfig = defaultWagmiConfig({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  metadata,
  chains: [
    sepolia,
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string),
  },
  // Continuously throws "localStorage is not defined" errors
  enableCoinbase: false,
});

createWeb3Modal({
  wagmiConfig,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  themeMode: 'dark',
});

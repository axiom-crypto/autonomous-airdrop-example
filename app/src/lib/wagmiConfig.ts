import { Chain, sepolia } from "viem/chains";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const metadata = {
  name: 'Axiom Autonomous Airdrop Example dApp',
  description: 'Axiom Autonomous Airdrop Example dApp',
  verifyUrl: 'localhost:3000',
  url: 'localhost:3000',
  icons: ['']
}

const chains: [Chain, ...Chain[]] = [sepolia]
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({ wagmiConfig, projectId, chains })
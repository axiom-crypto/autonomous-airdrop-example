'use client';

import ConnectWallet from '@/components/ui/ConnectWallet'
import AdvanceStepButton from '@/components/ui/AdvanceStepButton'
import Title from '@/components/ui/Title'
import compiledCircuit from "../../axiom/data/compiled.json";
import { useAccount } from 'wagmi';
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';

export default async function Home() {
  const { isConnected, address } = useAccount();

  if (compiledCircuit === undefined) {
    return (
      <>
        <div>
          Compile circuit first by running
        </div>
        <CodeBox>
          {"npx axiom compile circuit app/axiom/swapEvent.circuit.ts"}
        </CodeBox>
      </>
    )
  }

  const renderButton = () => {
    if (isConnected) {
      return <AdvanceStepButton
        label="Generate Proof"
        href={"/check"}
      />;
    }
    return <ConnectWallet />;
  }

  return (
    <>
      <Title>
        Autonomous Airdrop Example
      </Title>
      <div className="text-center">
        Anyone who has used <Link href="https://app.uniswap.org/swap" target="_blank">Uniswap</Link> (swapping a token for a token that is <b>not</b> ETH) on 
        Sepolia testnet after block 4000000 is eligible for an airdrop of a test token called UselessToken. You may need to wait a few minutes after executing 
        your swap for the indexer to pick it up.
      </div>
      {renderButton()}
    </>
  )
}
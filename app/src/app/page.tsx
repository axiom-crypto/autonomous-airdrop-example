'use client';

import ConnectWallet from '@/components/ui/ConnectWallet'
import AdvanceStepButton from '@/components/ui/AdvanceStepButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import compiledCircuit from "../../axiom/data/compiled.json";
import { useAccount } from 'wagmi';
import CodeBox from '@/components/ui/CodeBox';

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Home({ searchParams }: PageProps) {
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
        Swap Proof.
      </Title>
      <div className="text-center">
        Generate a ZK proof of your average ETH balance over the past 7,200 blocks (24 hours).
      </div>
      {renderButton()}
    </>
  )
}
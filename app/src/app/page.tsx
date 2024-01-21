'use client';

import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import compiledCircuit from "../../axiom/data/compiled.json";
import { useAccount } from 'wagmi';

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
      <div>
        Compile circuit first!
      </div>
    )
  }

  const renderButton = () => {
    if (isConnected) {
      return <LinkButton
        label="Generate Proof"
        href={"/prove?" + forwardSearchParams({ connected: address })}
      />;
    }
    return <ConnectWallet />;
  }

  return (
    <>
      <Title>
        Swap Proof
      </Title>
      <div className="text-center">
        Generate a ZK proof of your average ETH balance over the past 7,200 blocks (24 hours).
      </div>
      {renderButton()}
    </>
  )
}
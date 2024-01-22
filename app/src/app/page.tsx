import AdvanceStepButton from '@/components/ui/AdvanceStepButton'
import Title from '@/components/ui/Title'
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';

export default async function Home() {
  let compiledCircuit;
  try {
    compiledCircuit = require("../../axiom/data/compiled.json");
  } catch (e) {
    console.log(e);
  }
  if (compiledCircuit === undefined) {
    return (
      <>
        <div>
          Compile circuit first by running in the root directory of this project:
        </div>
        <CodeBox>
          {"npx axiom compile circuit app/axiom/swapEvent.circuit.ts"}
        </CodeBox>
      </>
    )
  }

  return (
    <>
      <Title>
        Autonomous Airdrop Example
      </Title>
      <div className="text-center">
        Anyone who has used <Link href="https://app.uniswap.org/swap" target="_blank">Uniswap</Link> to
        swap in the UniswapV3 UNI-WETH pool on Sepolia testnet after block 4000000 is eligible for an 
        airdrop of a useless test ERC20 token. You may need to wait a few minutes after executing your
        swap for the indexer to pick it up.
      </div>
      <AdvanceStepButton
        label="Generate Proof"
        href={"/check"}
      />
    </>
  )
}
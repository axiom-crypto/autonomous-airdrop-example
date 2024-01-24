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
          {"npx axiom compile circuit app/axiom/refundEvent.circuit.ts"}
        </CodeBox>
      </>
    )
  }

  return (
    <>
      <Title>
        Asset Refund Example
      </Title>
      <div className="text-center">
        Anyone who has sent UNI token to the specified address on Sepolia testnet is eligible for a
        refund of their UNI.
      </div>
      <AdvanceStepButton
        label="Generate Proof"
        href={"/check"}
      />
    </>
  )
}
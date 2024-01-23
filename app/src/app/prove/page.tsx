import BuildQuery from "@/components/prove/BuildQuery";
import Title from "@/components/ui/Title";
import AssetRefund from '@/lib/abi/AssetRefund.json';
import jsonInputs from "../../../axiom/data/inputs.json";
import { Constants } from "@/shared/constants";
import { UserInput } from "@axiom-crypto/client";

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

export default async function Prove({ searchParams }: PageProps) {
  const inputs: UserInput<typeof jsonInputs> = {
    blockNumber: Number(searchParams.blockNumber),
    txIdx: Number(searchParams.txIdx),
    logIdx: Number(searchParams.logIdx),
  };

  return (
    <>
      <Title>
        Prove
      </Title>
      <div className="text-center">
        Please wait while your browser generates a compute proof for the Axiom Query.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackAddress={Constants.ASSET_REFUND_ADDR}
          callbackAbi={AssetRefund.abi}
        />
      </div>
    </>
  )
}

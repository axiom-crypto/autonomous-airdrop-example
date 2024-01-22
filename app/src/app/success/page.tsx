import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import Link from "next/link";

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

export default async function Success({ searchParams }: PageProps) {
  const txHash = searchParams?.txHash as string ?? "";
  const queryId = searchParams?.queryId as string ?? "";

  return (
    <>
      <Title>
        Success
      </Title>
      <div className="text-center">
        {"Congratulations! Your Axiom query has been fulfilled."}
      </div>
      <Link href={`${Constants.EXPLORER_BASE_URL}/query/${queryId}`} target="_blank">
        View on Axiom Explorer
      </Link>
      <Link href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">
        View on Etherscan
      </Link>
    </>
  )
}

"use client";

import { Constants } from "@/shared/constants";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { formatEther, formatUnits } from "viem";
import Link from "next/link";
import { useAxiomCircuit } from '@axiom-crypto/react';
import Decimals from "../ui/Decimals";
import { UserInput } from "@axiom-crypto/client";
import jsonInputs from "../../../axiom/data/inputs.json";

export default function ClaimRefundClient({
  refundAbi,
  inputs
}: {
  refundAbi: any[],
  inputs: UserInput<typeof jsonInputs>;
}) {
  // const { address } = useAccount();
  console.log(inputs.blockNumber);
  console.log(inputs.txIdx);
  const router = useRouter();
  const { builtQuery } = useAxiomCircuit();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  // Prepare hook for the sendQuery transaction
  const { data, error } = useSimulateContract(builtQuery!);
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  // Check that the user has not claimed the refund yet
  const { data: hasClaimed, isPending: hasClaimedLoading } = useReadContract({
    address: Constants.ASSET_REFUND_ADDR as `0x${string}`,
    abi: refundAbi,
    functionName: 'hasClaimed',
    args: [(BigInt(inputs.blockNumber) << BigInt(128) | BigInt(inputs.txIdx)) ?? ""],
  });

  console.log("num: ", ((BigInt(inputs.blockNumber) << BigInt(128) | BigInt(inputs.txIdx)) ?? ""));

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 10000);
    }
  }, [isSuccess, setShowExplorerLink]);

  // Monitor contract for `ClaimRefund`
  useWatchContractEvent({
    address: Constants.ASSET_REFUND_ADDR as `0x${string}`,
    abi: refundAbi,
    eventName: 'ClaimRefund',
    onLogs(logs: any) {
      let topics = logs[0].topics;
      if (topics[2] && builtQuery?.queryId && BigInt(topics[2]) === BigInt(builtQuery?.queryId)) {
        let txHash = logs[0].transactionHash;
        router.push(`success/?txHash=${txHash}&queryId=${builtQuery?.queryId}`);
      }
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isPending) {
      return "Confirm transaction in wallet...";
    }
    if (!!hasClaimed) {
      return "Refund already claimed for this transaction"
    }
    return "Claim your UNI";
  }

  const renderClaimProofCostText = () => {
    return (
      <div className="flex flex-col items-center text-sm mt-2">
        <div>
          {"Generating the proof for the claim costs up to "}
          <Decimals>
            {formatEther(BigInt(builtQuery?.value ?? 0)).toString()}
          </Decimals>
          {"ETH"}
        </div>
        <div>
          {"(Based on a current maxFeePerGas of "}
          <Decimals>
            {formatUnits(builtQuery?.args?.[4]?.maxFeePerGas ?? "0", 9).toString()}
          </Decimals>
          {" gwei)"}
        </div>
      </div>
    )
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`${Constants.EXPLORER_BASE_URL}/query/${builtQuery?.queryId}`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={!data?.request || isPending || isSuccess || !!hasClaimed}
        onClick={() => writeContract(data!.request)}
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofCostText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}

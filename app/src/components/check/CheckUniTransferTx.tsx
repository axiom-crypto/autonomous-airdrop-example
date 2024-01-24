"use client"

import { findMostRecentUniTransferTx } from "@/lib/parseRecentTx";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AdvanceStepButton from "../ui/AdvanceStepButton";
import LoadingAnimation from "../ui/LoadingAnimation";

export default function CheckUniTransferTx() {
  const [recentTransfer, setRecentTransfer] = useState<any | undefined | null>(undefined);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const findTx = async () => {
      if (address === undefined || !isConnected) {
        return;
      }
      const recentTransfer = await findMostRecentUniTransferTx(address);
      setRecentTransfer(recentTransfer);
    }
    findTx();
  }, [address, isConnected]);

  if (recentTransfer === undefined) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Finding recent transfer event"} <LoadingAnimation />
      </div>
    );
  } else if (recentTransfer === null) {
    return (
      <>
        <div className="text-center">
          {"Sorry, we couldn't find a transfer event of UNI to the specified address from this account."}
        </div>
        <AdvanceStepButton
          label="Go back"
          href="/"
        />
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center font-mono gap-2">
        <div>
          {"Recent Transfer found"}
        </div>
        <div className="pb-2">
          {JSON.stringify(recentTransfer, null, 2)}
        </div>
        <AdvanceStepButton
          label="Build Axiom proof params"
          href={"/prove?" + new URLSearchParams({
            blockNumber: recentTransfer.blockNumber,
            txIdx: recentTransfer.txIdx,
            logIdx: recentTransfer.logIdx,
          })}
        />
      </div>
    )
  }
}
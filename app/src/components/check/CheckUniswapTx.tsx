"use client"

import { findMostRecentUniswapTx } from "@/lib/parseRecentTx";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AdvanceStepButton from "../ui/AdvanceStepButton";
import LoadingAnimation from "../ui/LoadingAnimation";

export default function CheckUniswapTx() {
  const [recentSwap, setRecentSwap] = useState<any | undefined | null>(undefined);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const findTx = async () => {
      if (address === undefined || !isConnected) {
        return;
      }
      const recentSwap = await findMostRecentUniswapTx(address);
      setRecentSwap(recentSwap);
    }
    findTx();
  }, [address, isConnected]);

  if (recentSwap === undefined) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Finding recent Swap event"} <LoadingAnimation />
      </div>
    );
  } else if (recentSwap === null) {
    return (
      <>
        <div className="text-center">
          {"Sorry, we couldn't find a Swap event for the UniV3 UNI-WETH pool for this address after Sepolia block 4000000."}
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
          {"Recent Swap found"}
        </div>
        <div className="pb-2">
          {JSON.stringify(recentSwap, null, 2)}
        </div>
        <AdvanceStepButton
          label="Build Axiom proof params"
          href={"/prove?" + new URLSearchParams({
            blockNumber: recentSwap.blockNumber,
            txIdx: recentSwap.txIdx,
            logIdx: recentSwap.logIdx,
          })}
        />
      </div>
    )
  }
}
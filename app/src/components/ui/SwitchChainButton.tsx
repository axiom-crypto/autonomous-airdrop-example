"use client";

import { Constants } from "@/shared/constants"
import Button from "./Button"
import { SwitchChainMutate } from "wagmi/query";
import { Config } from "wagmi";

export default function SwitchChainButton({ switchChain }: {
  switchChain: SwitchChainMutate<Config, unknown>;// (input: { [chainId: string]: number }) => void
}) {
  return (
    <Button onClick={() => switchChain({ chainId: Constants.CHAIN_ID_SEPOLIA })}>
      Switch to Sepolia
    </Button>
  )
}
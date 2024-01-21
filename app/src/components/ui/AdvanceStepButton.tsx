"use client";

import { classes } from "@/lib/utils";
import Link from "next/link";
import ConnectWallet from '@/components/ui/ConnectWallet'
import { useAccount, useSwitchChain } from "wagmi";
import { Constants } from "@/shared/constants";
import SwitchChainButton from "./SwitchChainButton";

export default function AdvanceStepButton({ label, href, selected, disabled }:{
  label: string,
  href: string,
  selected?: boolean,
  disabled?: boolean,
}) {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  if (!isConnected) {
    return <ConnectWallet />
  }
  if (chainId !== Constants.CHAIN_ID_SEPOLIA) {
    return <SwitchChainButton switchChain={switchChain} />
  }
  return (
    <Link href={href} prefetch={false}>
      <div 
        className={classes(
          "text-highlight text-md font-mono border-[1px] border-highlight bg-buttonbg",
          "px-4 py-2 hover:bg-buttonbg-hover hover:text-white duration-300 cursor-pointer"
        )}
      >
        { label }
      </div>
    </Link>
  )
}
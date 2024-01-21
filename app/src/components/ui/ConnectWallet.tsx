"use client";

import {
  useAccount,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import Button from './Button';
import { shortenAddress } from '@/lib/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button
        onClick={() => {
          disconnect();
        }}
      >
        {ensName ? ensName : shortenAddress(address as string)}
      </Button>
    )
  }

  return (
    <div>
      <Button
        onClick={() => {
          open();
        }}
      >
        {"Connect Wallet"}
      </Button>
    </div>
  )
}
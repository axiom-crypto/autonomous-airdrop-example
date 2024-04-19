"use client";

import {
  useAccount,
  useEnsName,
} from 'wagmi'
import Button from './Button';
import { shortenAddress } from '@/lib/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const signInModal = useWeb3Modal();

  if (isConnected) {
    return (
      <Button
        onClick={() => {
          signInModal.open({ view: "Account" })
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
          signInModal.open()
        }}
      >
        {"Connect Wallet"}
      </Button>
    </div>
  )
}
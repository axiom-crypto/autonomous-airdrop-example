"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import Button from './Button';
import { shortenAddress } from '@/lib/utils';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect();
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
          connect({ connector: injected() })
        }}
      >
        {"Connect Wallet"}
      </Button>
    </div>
  )
}
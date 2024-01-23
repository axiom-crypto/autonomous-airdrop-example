import { Constants } from "@/shared/constants";
import { bytes32 } from "./utils";

export async function findMostRecentUniTransferTx(address: string): Promise<{
  blockNumber: string,
  txIdx: string,
  logIdx: string,
} | null> {
  let pageKey = "";
  while (pageKey !== undefined) {
    const res = await getRecentTxs(address, pageKey);
    if (res === null) {
      console.log("Could not find any transfer transaction");
      return null;
    }
    const recentTx = res?.transfers ?? [];
    for (const tx of recentTx) {
      // These are only the transactions that are from the user to the specified address,
      // since we constrained the query by `fromAddress` (user) and `toAddress` (specified address)
      const receipt = await getRecentReceipt(tx?.hash);
      if (receipt === null) {
        continue;
      }
      if (receipt.logs.length > 0) {
        for (const [idx, log] of receipt.logs.entries()) {
          if (
            log.topics[0] === Constants.EVENT_SCHEMA &&
            log.topics[1].toLowerCase() === bytes32(address.toLowerCase()) &&
            log.topics[2].toLowerCase() === bytes32(Constants.RECEIVER_ADDRESS) &&
            log.address.toLowerCase() == Constants.UNI_TRANSFER_ADDRESS.toLowerCase()
          ) {
            console.log("hello");
            // Note that logIdx is the index of the log in the transaction, **not** within the block
            return {
              blockNumber: Number(log.blockNumber).toString(),
              txIdx: Number(log.transactionIndex).toString(),
              logIdx: idx.toString(),
            }
          }
        }
      }
    }
    pageKey = res?.pageKey;
  }
  console.log("Could not find any transfer transaction");
  return null;
}

async function getRecentTxs(address: string, pageKey?: string) {
  let params: { [key: string]: any } = {
    "fromBlock": "0x" + BigInt(Constants.ELIGIBLE_BLOCK_HEIGHT).toString(16),
    "toBlock": "latest",
    "fromAddress": address.toLowerCase(),
    "toAddress": Constants.UNI_TRANSFER_ADDRESS,
    "withMetadata": false,
    "excludeZeroValue": false,
    "maxCount": "0x3e8",
    "order": "desc",
    "category": [
      "external"
    ],
  }
  console.log(params);
  if (typeof pageKey !== "undefined" && pageKey !== "") {
    params[pageKey] = pageKey;
  }
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "alchemy_getAssetTransfers",
        "params": [
          params
        ]
      }),
    })
    const json = await res.json();
    return json?.result;
  } catch (e) {
    return null;
  }
}

async function getRecentReceipt(hash: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "eth_getTransactionReceipt",
        "params": [hash]
      }),
    })
    const json = await res.json();
    return json?.result;
  } catch (e) {
    return null;
  }
}

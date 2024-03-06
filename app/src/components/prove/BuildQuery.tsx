"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { UserInput } from "@axiom-crypto/client";
import jsonInputs from "../../../axiom/data/inputs.json";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import { useAccount } from "wagmi";
import { bytes32 } from "@/lib/utils";
import ClaimAirdropClient from "./ClaimAirdropClient";

export default function BuildQuery({
  inputs,
  callbackTarget,
  callbackExtraData,
  callbackAbi
}: {
  inputs: UserInput<typeof jsonInputs>;
  callbackTarget: string;
  callbackExtraData?: string;
  callbackAbi: any[];
}) {
  const {
    build,
    builtQuery,
    setParams,
    areParamsSet
  } = useAxiomCircuit<typeof jsonInputs>();

  const { address: refundee } = useAccount();

  useEffect(() => {
    if (refundee === undefined) {
      return;
    }
    if (callbackExtraData === undefined) {
      callbackExtraData = bytes32("0");
    }
    setParams(inputs, callbackTarget, callbackExtraData, refundee);
  }, [setParams, inputs, callbackTarget, callbackExtraData, refundee]);

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [build, areParamsSet]);

  if (!builtQuery) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={callbackAbi} />;
}

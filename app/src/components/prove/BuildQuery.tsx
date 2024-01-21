"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { UserInput } from "@axiom-crypto/client";
import jsonInputs from "../../../axiom/data/inputs.json";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import SubmitQuery from "./SubmitQuery";
import { useAccount } from "wagmi";
import { bytes32 } from "@/lib/utils";

export default function BuildQuery({
  inputs,
  callbackAddress,
  callbackExtraData,
  callbackAbi
}: {
  inputs: UserInput<typeof jsonInputs>;
  callbackAddress: string;
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

  if (callbackExtraData === undefined) {
    callbackExtraData = bytes32("0");
  }

  useEffect(() => {
    if (refundee === undefined) {
      return;
    }
    setParams(inputs, callbackAddress, callbackExtraData, refundee);
  }, [setParams, inputs, callbackAddress, callbackExtraData, refundee]);

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      console.log("inputs", inputs);
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

  return <SubmitQuery callbackAbi={callbackAbi} />;
}

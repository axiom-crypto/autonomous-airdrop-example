"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { UserInput } from "@axiom-crypto/client";
import jsonInputs from "../../../axiom/data/inputs.json";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import SubmitQuery from "./SubmitQuery";

export default function BuildQuery({
  inputs,
  callbackAddress,
  callbackExtraData,
  refundee,
  callbackAbi
}: {
  inputs: UserInput<typeof jsonInputs>;
  callbackAddress: string;
  callbackExtraData: string;
  refundee: string;
  callbackAbi: any[];
}) {
  const {
    build,
    builtQuery,
    setParams,
    areParamsSet
  } = useAxiomCircuit<typeof jsonInputs>();

  useEffect(() => {
    setParams(inputs, callbackAddress, callbackExtraData, refundee);
  }, [setParams, inputs, callbackAddress, callbackExtraData, refundee]);

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

  return <SubmitQuery callbackAbi={callbackAbi} />;
}

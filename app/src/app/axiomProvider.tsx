"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import compiledCircuit from "../../axiom/data/compiled.json";

export default function AxiomProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      compiledCircuit={compiledCircuit}
      provider={process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string}
      chainId={"11155111"}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}

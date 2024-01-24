import {
  isEqual,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getReceipt,
  getTx,
} from "@axiom-crypto/client";

/// For type safety, define the input types to your circuit here.
/// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  txIdx: CircuitValue;
  logIdx: CircuitValue;
  senderAddress: CircuitValue256;
  expectedAmount: CircuitValue256;
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to 
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag 
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {
  const eventSchema =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  // specify and fetch the data you want Axiom to verify
  const receipt = getReceipt(inputs.blockNumber, inputs.txIdx);
  const receiptLog = receipt.log(inputs.logIdx);
  const tokenContractAddress = await receiptLog.address();

  console.log(tokenContractAddress);

  // Verify the UNI Transfer event
  const transferFrom = await receiptLog.topic(1, eventSchema);
  const transferTo = await receiptLog.topic(2, eventSchema);
  const transferValue = await receiptLog.data(0, eventSchema);

  addToCallback(transferFrom);
  addToCallback(transferTo);
  addToCallback(transferValue);
  addToCallback(tokenContractAddress);
  addToCallback(inputs.blockNumber);
  addToCallback(inputs.txIdx);
};
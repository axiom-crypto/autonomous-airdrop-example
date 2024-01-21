# Autonomous Airdrop (using Axiom Client SDK)

This example allows users to autonomously claim an airdrop of an example ERC20 token. Users utilize a data-fetching layer on top of Axiom to autonomously prove that their account matches some parameters before submitting a Query. In this case, it is the user has used Uniswap (swapping a token for a token that is **not** ETH) on Sepolia testnet after block 4000000.

This example was created by writing a client circuit with the [Axiom Client SDK](https://github.com/axiom-crypto/axiom-client) and using it to generate Axiom queries inside a webapp using [Axiom SDK React Components](https://www.npmjs.com/package/@axiom-crypto/react).

## Contracts

`/contracts` contains all of the Solidity contract code.

## Webapp

`/webapp` is a full Next.js 13 (app router) implementation of an Autonomous Airdrop dApp.

The Axiom client circuit code is located at [`/webapp/src/lib/circuit/circuit.ts`](./webapp/src/lib/circuit/circuit.ts).

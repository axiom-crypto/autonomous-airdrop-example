# Autonomous Airdrop (using Axiom Client SDK)

This example allows users to autonomously claim an airdrop of an example ERC20 token. Users utilize a data-fetching layer on top of Axiom to autonomously prove that their account matches some parameters before submitting a Query. In this case, it is the user has swapped in the UniswapV3 UNI-WETH pool on Sepolia testnet after block 4000000.

This example was created by writing a client circuit with the [Axiom Client SDK](https://github.com/axiom-crypto/axiom-sdk-client) and using it to generate Axiom queries inside a webapp using [Axiom SDK React Components](https://www.npmjs.com/package/@axiom-crypto/react).

## dApp

[`/app`](./app) is a full Next.js 14 implementation of the Autonomous Airdrop dApp. You will need to fill in an `.env.local` file in that folder for the Next.js app to run.

## Axiom Circuit

The Axiom client circuit code and supporting files are is located in [`./app/axiom`](./app/axiom).

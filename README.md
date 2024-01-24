# Asset Refund (using Axiom Client SDK)

This example allows users to claim a refund of UNI token sent to the specified address. Users utilize a data-fetching layer on top of Axiom to prove that their account matches some parameters before submitting a Query. In this case, it is the user has sent UNI to the specified address.

This example was created by writing a client circuit with the [Axiom Client SDK](https://github.com/axiom-crypto/axiom-sdk-client) and using it to generate Axiom queries inside a webapp using [Axiom SDK React Components](https://www.npmjs.com/package/@axiom-crypto/react).

## dApp

[`/app`](./app) is a full Next.js 14 implementation of the Asset Refund dApp. You will need to fill in an `.env.local` file in that folder for the Next.js app to run.

## Axiom Circuit

The Axiom client circuit code and supporting files are is located in [`./app/axiom`](./app/axiom).

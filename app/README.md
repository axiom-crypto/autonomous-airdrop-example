# Axiom Next.js Quickstart

This Axiom Next.js 14 Quickstart provides a barebones framework through which you build full stack dApps on top of Axiom. The Axiom circuit and build files are inside the [axiom/](./axiom/) folder and [src/](./src/) contains a Next.js template.

## Setup
1. Copy `.env.local.example` as a new file named `.env.local`
2. Fill in the values in `.env.local` with your own values
    a. `NEXT_PUBLIC_ALCHEMY_KEY` is your Alchemy API key; you'll need to sign up for an [Alchemy](https://www.alchemy.com/) account
    b. `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is your WalletConnect project ID; you'll need to sign up for a [WalletConnect](https://walletconnect.com/) account
3. Run `npm install` (or `yarn`/`pnpm`) to install dependencies
4. Run `npm run dev` to start the local development server

## Updating Circuit
If you make any changes to your circuit ([./axiom/average.circuit.ts](./axiom/average.circuit.ts)), run `npm run build:circuit` to re-compile your circuit.

## Updating Callback Contract

To use your own callback contract, change the `CALLBACK_CONTRACT` address in [./src/shared/constants.ts](./src/shared/constants.ts), add your ABI to [./src/lib/abi/](./src/lib/abi/), and update the ABI import in [./src/app/prove/page.tsx](./src/app/prove/page.tsx).

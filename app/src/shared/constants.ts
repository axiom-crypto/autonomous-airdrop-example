export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/sepolia/",

  UNISWAP_UNIV_ROUTER_SEPOLIA: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),
  UNIV3_POOL_UNI_WETH: "0x224Cc4e5b50036108C1d862442365054600c260C".toLowerCase(),
  AUTO_AIRDROP_ADDR: "0xa8d9A7fC6Cc29779Aa64e4101bf091ec0Fd627DC",
  TOKEN_ADDR: "0x94671D0707942e0D616893F941426EfC72025bDE",

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA: "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
  ELIGIBLE_BLOCK_HEIGHT: 4000000,
  CHAIN_ID_SEPOLIA: 11155111,
});

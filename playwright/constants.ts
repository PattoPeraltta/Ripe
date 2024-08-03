import type { ChainConfig } from "@synthetixio/synpress/commands/metamask";

export const NETWORKS: Record<string, ChainConfig> = {
  optimismSepolia: {
    chainId: 534351,
    name: "Scroll Sepolia",
    rpcUrl: `https://sepolia-rpc.scroll.io/${process.env.NEXT_PUBLIC_ALCHEMY_ID!}`,
    symbol: "ETH",
  },
};

// Don't use it for production, only for e2e testing
export const TEST_MNEMONIC = "test test test test test test test test test test test junk";
export const TEST_PASSWORD = "Tester@1234";

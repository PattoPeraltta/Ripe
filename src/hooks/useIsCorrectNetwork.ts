import { useEffect, useState } from "react";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { useAccount, useChainId } from "wagmi";

import { config } from "~/config";

export interface IUseIsCorrectNetworkReturn {
  isCorrectNetwork: boolean;
  correctNetwork: typeof config.network;
}

export function useIsCorrectNetwork(): IUseIsCorrectNetworkReturn {
  const [address, setAddress] = useState<string>();
  const account = useActiveAccount();
  useEffect(() => {
    if (account) {
      setAddress(account.address);
    }
  }, [account]);

  const [chainId, setChainId] = useState<number>();
  const chain = useActiveWalletChain();
  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  const isCorrectNetwork = (account && chainId === config.network.id) || false;

  return {
    isCorrectNetwork,
    correctNetwork: config.network,
  };
}

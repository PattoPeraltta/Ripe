import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useAccount } from "wagmi";

import { config } from "~/config";

export function useIsAdmin(): boolean {
  const [address, setAddress] = useState<string>();
  const account = useActiveAccount();
  useEffect(() => {
    if (account) {
      setAddress(account.address);
    }
  }, [account]);

  return config.admin === address!;
}

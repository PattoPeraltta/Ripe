"use client";
import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithRef, useCallback } from "react";
import { FaListCheck } from "react-icons/fa6";
import { createBreakpoint } from "react-use";
import { toast } from "sonner";
import { useEnsAvatar, useEnsName } from "wagmi";

import { config } from "~/config";
import { useBallot } from "~/contexts/Ballot";
import { useMaci } from "~/contexts/Maci";
import { useLayoutOptions } from "~/layouts/BaseLayout";

import type { Address } from "viem";

import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet, Wallet, walletConnect } from "thirdweb/wallets";

const useBreakpoint = createBreakpoint({ XL: 1280, L: 768, S: 350 });

const UserInfo = ({ address, children, ...props }: { address: Address } & ComponentPropsWithRef<typeof Chip>) => {
  const ens = useEnsName({
    address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  });
  const name = ens.data ?? undefined;
  const avatar = useEnsAvatar({
    name,
    chainId: 1,
    query: { enabled: Boolean(name) },
  });

  return (
    <Chip className="gap-2" {...props}>
      <div className="h-6 w-6 overflow-hidden rounded-full">
        {avatar.data ? (
          <Image alt={name!} height={24} src={avatar.data} width={24} />
        ) : (
          <div className="h-full bg-gray-200" />
        )}
      </div>

      {children}
    </Chip>
  );
};

const SignupButton = ({
  loading,
  ...props
}: ComponentPropsWithRef<typeof Chip> & { loading: boolean }): JSX.Element => (
  <Chip className="gap-2" disabled={loading} {...props}>
    {loading ? "Loading..." : "Sign up"}
  </Chip>
);

const ConnectedDetails = ({
  openAccountModal,
  account,
  isMobile,
}: {
  account: { address: string; displayName: string };
  openAccountModal: () => void;
  isMobile: boolean;
}) => {
  const { isLoading, isRegistered, isEligibleToVote, onSignup } = useMaci();
  const { ballot } = useBallot();
  const ballotSize = (ballot?.votes ?? []).length;

  const { showBallot } = useLayoutOptions();

  const onError = useCallback(() => toast.error("Signup error"), []);
  const handleSignup = useCallback(() => onSignup(onError), [onSignup, onError]);

  return (
    <div>
      <div className="flex gap-2 text-[#222133]">
        {!isEligibleToVote && <Chip>You are not allowed to vote</Chip>}

        {isEligibleToVote && !isRegistered && (
          <SignupButton loading={isRegistered === undefined || isLoading} onClick={handleSignup} />
        )}

        {isRegistered && showBallot && ballot?.published && <Chip>Already submitted</Chip>}

        {isRegistered && showBallot && !ballot?.published && (
          <Chip as={Link} className="gap-2" href="/ballot">
            {isMobile ? <FaListCheck className="h-4 w-4" /> : `View Ballot`}

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs">
              {ballotSize}
            </div>
          </Chip>
        )}

        <UserInfo address={account.address as Address} onClick={openAccountModal}>
          {isMobile ? null : account.displayName}
        </UserInfo>
      </div>
    </div>
  );
};

const client = createThirdwebClient({
  clientId: "989b407de9ce25994a3ba556785c54f6",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];

function decodeJWT(token: any) {
  const base64Url = token.split(".")[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

async function registerUser(userAddress: String) {
  const mint = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userAddress: userAddress }),
  }).then((res) => res.json());
  return mint;
}

export const Component = (): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "S";
  const { isLoading, isRegistered, isEligibleToVote, onSignup } = useMaci();

  function handleConnect(wallet: Wallet) {
    console.log("Connected wallet", wallet);
    const account = wallet.getAccount();
    console.log("Connected account", account);
    if (!account) {
      console.log("Account not found");
      return;
    }
    const token = localStorage.getItem("walletToken-989b407de9ce25994a3ba556785c54f6");

    if (!token) {
      console.log("Token not found");
      return;
    }

    const payload = decodeJWT(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = payload.exp;
    if (currentTime > expiryTime) {
      console.log("Token expired");
      return;
    } else {
      console.log("Token is valid", payload.storedToken.authDetails.email);
      const domainRegex = /^[a-zA-Z0-9._%+-]+@alu.ing.unlp.edu.ar$/;
      if (domainRegex.test(payload.storedToken.authDetails.email)) {
        console.log("Domain is valid");
      } else {
        console.log("Domain is invalid");
        return;
      }
    }
    console.log("User registered", account.address, payload.storedToken.jwtToken);
    // const res = registerUser(account.address);
    // console.log("User registered", res);
  }
  return (
    <div>
      {!isEligibleToVote && <Chip>You are not allowed to vote</Chip>}

      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        connectButton={{ label: "Connect" }}
        connectModal={{
          size: "wide",
          title: "Ripe",
          titleIcon: "",
          showThirdwebBranding: false,
        }}
        onConnect={(wallet: Wallet) => handleConnect(wallet)}
      />
    </div>
  );
};

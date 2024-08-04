import { useAccount } from "wagmi";

import { config } from "~/config";
import BallotOverview from "~/features/ballot/components/BallotOverview";
import { useAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";

import { type ReactNode, type PropsWithChildren, useState, useEffect } from "react";

import { type LayoutProps } from "./BaseLayout";
import { useActiveAccount } from "thirdweb/react";

type Props = PropsWithChildren<
  {
    sidebar?: "left" | "right";
    sidebarComponent?: ReactNode;
  } & LayoutProps
>;

export const Layout = ({ children = null, ...props }: Props): JSX.Element => {
  // const { address } = useAccount();
  const [address, setAddress] = useState<string>("");
  const account = useActiveAccount();
  useEffect(() => {
    if (account) {
      setAddress(account.address);
    }
  }, [account]);
  const appState = useAppState();

  const navLinks = [
    {
      href: "/",
      children: "Organizations",
    },
    {
      href: "/Discussions",
      children: "Discussions",
    },
    {
      href: "/Proposals",
      children: "Proposals",
    },
    {
      href: "/info",
      children: "Info",
    },
  ];

  if (appState === EAppState.RESULTS) {
    navLinks.push({
      href: "/stats",
      children: "Stats",
    });
  }

  if (config.admin === address!) {
    navLinks.push(
      ...[
        {
          href: "/applications",
          children: "Applications",
        },
        {
          href: "/voters",
          children: "Voters",
        },
      ],
    );
  }

  return children;
};

export const LayoutWithBallot = ({ ...props }: Props): JSX.Element => (
  <Layout sidebar="left" sidebarComponent={<BallotOverview />} {...props} />
);

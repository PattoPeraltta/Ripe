import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Form } from "~/components/ui/Form";
import { config } from "~/config";
import { useBallot } from "~/contexts/Ballot";
import { useMaci } from "~/contexts/Maci";
import { AllocationFormWrapper } from "~/features/ballot/components/AllocationList";
import { BallotSchema, type Vote } from "~/features/ballot/types";
import { LayoutWithBallot } from "~/layouts/DefaultLayout";
import { formatNumber } from "~/utils/formatNumber";
import { useAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";

const ClearBallot = () => {
  const form = useFormContext();
  const [isOpen, setOpen] = useState(false);
  const { deleteBallot } = useBallot();

  if ([EAppState.TALLYING, EAppState.RESULTS].includes(useAppState())) {
    return null;
  }

  const handleClearBallot = () => {
    deleteBallot();
    setOpen(false);
    form.reset({ votes: [] });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        Remove all projects from vote
      </Button>

      <Dialog isOpen={isOpen} size="sm" title="Are you sure?" onOpenChange={setOpen}>
        <p className="mb-6 leading-6">This will empty your vote and remove all the projects you have added.</p>

        <div className="flex justify-end">
          <Button
            variant="primary"
            // disabled={isPending}
            onClick={handleClearBallot}
          >
            Yes I am sure
          </Button>
        </div>
      </Dialog>
    </>
  );
};

const EmptyBallot = () => (
  <div className="flex flex-1 items-center justify-center">
    <div className=" max-w-[360px] space-y-4">
      <h3 className="text-center text-lg font-bold text-[#222133]">Your vote is empty</h3>

      <p className="text-center text-sm text-gray-700">
        Your vote currently doesn&apos;t have any projects added. Browse through the available projects.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Button as={Link} href="/projects">
          View projects
        </Button>
      </div>
    </div>
  </div>
);

const TotalAllocation = () => {
  const { sumBallot } = useBallot();
  const { initialVoiceCredits } = useMaci();
  const form = useFormContext<{ votes: Vote[] }>();
  const votes = form.watch("votes");
  const sum = sumBallot(votes);

  return <div>{`${formatNumber(sum)} / ${initialVoiceCredits} ${config.tokenName}`}</div>;
};

const BallotAllocationForm = () => {
  const appState = useAppState();
  const { ballot } = useBallot();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-[#222133]">Review your vote</h1>

      <p className="mb-6 text-[#222133]">Once you have reviewed your votes allocation, you can submit your vote.</p>

      <div className="mb-2 justify-between sm:flex">{ballot?.votes.length ? <ClearBallot /> : null}</div>

      <div className="relative rounded-2xl border border-gray-300 dark:border-gray-800">
        <div className="p-8">
          <div className="relative flex max-h-[500px] min-h-[360px] flex-col overflow-auto">
            {ballot?.votes.length ? (
              <AllocationFormWrapper disabled={appState === EAppState.RESULTS} />
            ) : (
              <EmptyBallot />
            )}
          </div>
        </div>

        <div className="flex h-16 items-center justify-between rounded-b-2xl border-t border-gray-300 px-8 py-4 text-lg font-semibold text-[#222133] dark:border-gray-800">
          <div>Total votes</div>

          <div className="flex items-center gap-2">
            <TotalAllocation />
          </div>
        </div>
      </div>
    </div>
  );
};

const BallotPage = (): JSX.Element => {
  const { address, isConnecting } = useAccount();
  const { ballot } = useBallot();
  const router = useRouter();

  useEffect(() => {
    if (!address && !isConnecting) {
      // eslint-disable-next-line no-console
      router.push("/").catch(console.error);
    }
  }, [address, isConnecting, router]);

  const votes = useMemo(() => ballot?.votes.sort((a, b) => b.amount - a.amount), [ballot]);

  if (!votes) {
    return <EmptyBallot />;
  }

  return (
    <LayoutWithBallot requireAuth sidebar="right">
      <Form defaultValues={ballot} schema={BallotSchema} values={ballot} onSubmit={() => null}>
        <BallotAllocationForm />
      </Form>

      <div className="py-8" />
    </LayoutWithBallot>
  );
};

export default BallotPage;

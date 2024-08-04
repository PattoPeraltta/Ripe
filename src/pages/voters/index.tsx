import { Alert } from "~/components/ui/Alert";
import { Heading } from "~/components/ui/Heading";
import { config } from "~/config";
import ApproveVoters from "~/features/voters/components/ApproveVoters";
import { VotersList } from "~/features/voters/components/VotersList";
import { AdminLayout } from "~/layouts/AdminLayout";

const VotersPage = (): JSX.Element => (
  <AdminLayout title="Manage voters">
    <div className="flex items-center justify-between text-[#222133]">
      <Heading as="h1" size="3xl">
        Members of the organization
      </Heading>

      <ApproveVoters />
    </div>

    {config.skipApprovedVoterCheck ? (
      <Alert className="mb-4 " variant="warning">
        Configuration has disabled voter approval check. Anyone is an eligible voter.
      </Alert>
    ) : null}

    <VotersList />
  </AdminLayout>
);

export default VotersPage;

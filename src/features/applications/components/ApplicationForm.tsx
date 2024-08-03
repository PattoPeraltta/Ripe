import { useLocalStorage } from "react-use";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { z } from "zod";

import { ImageUpload } from "~/components/ImageUpload";
import { Alert } from "~/components/ui/Alert";
import { IconButton } from "~/components/ui/Button";
import { Form, FormControl, FormSection, Input, Textarea } from "~/components/ui/Form";
import { Spinner } from "~/components/ui/Spinner";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";

import { useCreateApplication } from "../hooks/useCreateApplication";
import { ApplicationSchema, ProfileSchema } from "../types";

const ApplicationCreateSchema = z.object({
  profile: ProfileSchema,
  application: ApplicationSchema,
});

export interface IApplicationFormProps {
  address?: string;
}

const CreateApplicationButton = ({ isLoading, buttonText }: { isLoading: boolean; buttonText: string }) => {
  const { isCorrectNetwork, correctNetwork } = useIsCorrectNetwork();

  const { address } = useAccount();

  return (
    <div className="flex items-center justify-between">
      <div>
        {!address && <div>You must connect wallet to create a list</div>}

        {!isCorrectNetwork && (
          <div className="flex items-center gap-2">You must be connected to {correctNetwork.name}</div>
        )}
      </div>

      <IconButton
        disabled={isLoading}
        icon={isLoading ? Spinner : null}
        isLoading={isLoading}
        type="submit"
        variant="primary"
      >
        {buttonText}
      </IconButton>
    </div>
  );
};

export const ApplicationForm = ({}: IApplicationFormProps): JSX.Element => {
  const clearDraft = useLocalStorage("application-draft")[2];

  const create = useCreateApplication({
    onSuccess: () => {
      toast.success("Proposal created successfully!");
      clearDraft();
    },
    onError: (err: { reason?: string; data?: { message: string } }) =>
      toast.error("Proposal create error", {
        description: err.reason ?? err.data?.message,
      }),
  });
  if (create.isSuccess) {
    return (
      <Alert title="Proposal created!" variant="success">
        It will now be reviewed by our admins.
      </Alert>
    );
  }
  const { error } = create;

  const text = create.isAttesting ? "Creating attestation" : "Create application";

  return (
    <div>
      <Form
        defaultValues={{
          profile: {
            name: "",
            profileImageUrl: "",
            bannerImageUrl: "",
          },
          application: {
            contributionDescription: "",
          },
        }}
        schema={ApplicationCreateSchema}
        onSubmit={({ profile, application }) => {
          create.mutate({ application, profile });
        }}
      >
        <FormSection
          description="Configure your profile name and choose your avatar and background for your proposal."
          title="Profile"
        >
          <FormControl required label="Profile name" name="profile.name">
            <Input placeholder="Your proposal" />
          </FormControl>

          <div className="mb-4 gap-4 md:flex">
            <FormControl required label="Project avatar" name="profile.profileImageUrl">
              <ImageUpload className="h-48 w-48 " />
            </FormControl>

            <FormControl required className="flex-1" label="Project background image" name="profile.bannerImageUrl">
              <ImageUpload className="h-48 " />
            </FormControl>
          </div>
        </FormSection>

        <FormSection description="Describe the contribution and impact of your proposal." title="Proposal Description">
          <FormControl required label="Contribution description" name="application.contributionDescription">
            <Textarea placeholder="What will your proposal contribute to?" rows={4} />
          </FormControl>
        </FormSection>

        {error ? (
          <div className="mb-4 text-center text-gray-600 dark:text-gray-400">
            Make sure you&apos;re not connected to a VPN since this can cause problems with the RPC and your wallet.
          </div>
        ) : null}

        <CreateApplicationButton
          buttonText={create.isUploading ? "Uploading metadata" : text}
          isLoading={create.isPending}
        />
      </Form>
    </div>
  );
};

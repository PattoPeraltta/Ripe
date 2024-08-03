import { useController, useFormContext } from "react-hook-form";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { z } from "zod";

import { ImageUpload } from "~/components/ImageUpload";
import { Alert } from "~/components/ui/Alert";
import { IconButton } from "~/components/ui/Button";
import {
  ErrorMessage,
  FieldArray,
  Form,
  FormControl,
  FormSection,
  Input,
  Label,
  Select,
  Textarea,
} from "~/components/ui/Form";
import { Spinner } from "~/components/ui/Spinner";
import { Tag } from "~/components/ui/Tag";
import { impactCategories } from "~/config";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";

import { useCreateApplication } from "../hooks/useCreateApplication";
import { ApplicationSchema, ProfileSchema, contributionTypes, fundingSourceTypes } from "../types";

const ApplicationCreateSchema = z.object({
  profile: ProfileSchema,
  application: ApplicationSchema,
});

export interface IApplicationFormProps {
  address?: string;
}

const ImpactTags = (): JSX.Element => {
  const { control, watch, formState } = useFormContext<z.infer<typeof ApplicationCreateSchema>>();
  const { field } = useController({
    name: "application.impactCategory",
    control,
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const selected = watch("application.impactCategory") ?? [];

  const error = formState.errors.application?.impactCategory;
  return (
    <div className="mb-4">
      <Label>
        Impact categories<span className="text-red-300">*</span>
      </Label>

      <div className="flex flex-wrap gap-2">
        {Object.entries(impactCategories).map(([value, { label }]) => {
          const isSelected = selected.includes(value);
          return (
            <Tag
              key={value}
              selected={isSelected}
              size="lg"
              onClick={() => {
                const currentlySelected = isSelected ? selected.filter((s) => s !== value) : selected.concat(value);

                field.onChange(currentlySelected);
              }}
            >
              {label}
            </Tag>
          );
        })}
      </div>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

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

export const ApplicationForm = ({ address = "" }: IApplicationFormProps): JSX.Element => {
  const clearDraft = useLocalStorage("application-draft")[2];

  const create = useCreateApplication({
    onSuccess: () => {
      toast.success("Application created successfully!");
      clearDraft();
    },
    onError: (err: { reason?: string; data?: { message: string } }) =>
      toast.error("Application create error", {
        description: err.reason ?? err.data?.message,
      }),
  });
  if (create.isSuccess) {
    return (
      <Alert title="Application created!" variant="success">
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
          application: {
            payoutAddress: address,
            contributionLinks: [{}],
            impactMetrics: [{}],
            fundingSources: [{}],
          },
        }}
        schema={ApplicationCreateSchema}
        onSubmit={({ profile, application }) => {
          create.mutate({ application, profile });
        }}
      >
        <FormSection
          description="Configure your proposal name and choose the icon and background for it."
          title="Proposal"
        >
          <div className="gap-4 md:flex">
            <FormControl required label="Project avatar" name="profile.profileImageUrl">
              <ImageUpload className="h-48 w-48" />
            </FormControl>
            <FormControl required className="flex-1" label="Project background image" name="profile.bannerImageUrl">
              <ImageUpload className="h-48 " />
            </FormControl>
          </div>
          <FormControl required label="Profile name" name="profile.name">
            <Input placeholder="Proposal name" />
          </FormControl>
        </FormSection>
          <FormControl required label="Description" name="application.bio">
            <Textarea placeholder="Project description" rows={4} />
          </FormControl>

          <div className=" md:flex">
            <FormControl required className="flex-1" label="Website" name="application.websiteUrl">
              <Input placeholder="https://" />
            </FormControl>
          </div>
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

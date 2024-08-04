import { type ReactNode } from "react";

import { ProjectAvatar } from "~/features/projects/components/ProjectAvatar";
import { ProjectBanner } from "~/features/projects/components/ProjectBanner";
import { type Attestation } from "~/utils/fetchAttestations";

import { useProjectMetadata } from "../hooks/useProjects";

export interface IProjectDetailsProps {
  action: ReactNode;
  attestation?: Attestation;
}

const ProjectDetails = ({ attestation = undefined, action }: IProjectDetailsProps): JSX.Element => {
  const metadata = useProjectMetadata(attestation?.metadataPtr);

  const { name, contributionDescription } = metadata.data ?? {};

  return (
    <div className="relative">
      <div className="sticky left-0 right-0 top-0 z-10 bg-white p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{name}</h1>

          {action}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl">
        <ProjectBanner profileId={attestation?.recipient} size="lg" />
      </div>

      <div className="mb-8 flex items-end gap-4">
        <ProjectAvatar className="-mt-20 ml-8" profileId={attestation?.recipient} rounded="full" size="lg" />
      </div>

      <div className="mb-4 text-5xl">{name}</div>

      <p className="text-2xl font-thin">{contributionDescription}</p>
    </div>
  );
};

export default ProjectDetails;

import { PropsWithChildren } from "react";

import BallotOverview from "~/features/ballot/components/BallotOverview";
import { Projects } from "~/features/projects/components/Projects";

const BallotHeader = ({ children, ...props }: PropsWithChildren): JSX.Element => (
  <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-700 dark:text-[#222133]" {...props}>
    {children}
  </h3>
);

const BallotSection = ({ title, children }: { title: string | React.ReactNode } & PropsWithChildren) => (
  <div className="space-y-1 text-gray-500">
    <h4 className="text-sm font-semibold ">{title}</h4>

    <div className="space-y-1 text-lg font-semibold">{children}</div>
  </div>
);

const ProjectsPage = (): JSX.Element => (
  <div className="grid grid-cols-[auto,1fr] gap-4">
    <BallotOverview />

    <Projects />
  </div>
);
export default ProjectsPage;

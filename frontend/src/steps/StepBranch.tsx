import React from "react";
import FeatureStep from "../components/FeatureStep";
import { ReactComponent as BranchIcon } from "../assets/utility/branch.svg";
import commands from "../commands.json";
import CodeExample from "../components/CodeExample";

interface StepBranchProps {
  isDisabled: boolean;
}

const StepBranch: React.FC<StepBranchProps> = ({ isDisabled }) => {
  return (
    <FeatureStep
      data-testid="branch"
      icon={<BranchIcon className="w-10 h-10 p-1" />}
      title="2. Create your first preview environment"
      isDisabled={isDisabled}
    >
      <>
        <p className="mb-2">
          With Upsun, you can clone any environment to get a byte-for-byte copy
          to use for staging, features, and bug fixes.
        </p>
        <p className="mb-2">
          Before you make your first revision, let's create a new preview
          environment called <strong>Staging</strong>.
        </p>
        <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
        <ol className="list-decimal list-outside ml-4 mt-2">
          <li>
            <p className="mb-2 mt-2">
              <span>Create environment</span>
              <CodeExample
                copyText={commands.branch.user.branch}
                codeExampleText={commands.branch.user.branch}
              />
            </p>
          </li>
          <li>
            <p className="mb-2 mt-2">
              <span>Once deployed, open the environment in browser</span>
              <CodeExample
                copyText={commands.branch.user.get_url}
                codeExampleText={commands.branch.user.get_url}
              />
            </p>
          </li>
        </ol>
      </>
    </FeatureStep>
  );
};

export default StepBranch;

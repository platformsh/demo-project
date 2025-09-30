import React from "react";
import FeatureStep from "../components/FeatureStep";
import { ReactComponent as MergeIcon } from "../assets/utility/merge.svg";
import commands from "../commands.json";
import CodeExample from "../components/CodeExample";

interface StepMergeProductionProps {
  isDisabled: boolean;
  hideContent: boolean;
  environment: string | null;
}

const StepMergeProduction: React.FC<StepMergeProductionProps> = ({
  isDisabled,
  hideContent,
  environment,
}) => {
  return (
    <FeatureStep
      data-testid="step-merge-production"
      icon={<MergeIcon className="w-10 h-10" />}
      title="4. Merge changes into production & scale up"
      isDisabled={isDisabled}
      hideContent={hideContent}
    >
      <>
        <p className="mb-2">
          {environment?.toLocaleLowerCase() === "production" ? (
            <>Awesome! Your changes are live.</>
          ) : (
            <>
              Awesome! Your changes are live in{" "}
              {environment?.toLocaleLowerCase()}.
            </>
          )}
        </p>
        <p className="mb-2">
          {environment?.toLocaleLowerCase() === "production"
            ? "Use your preview environments to stage future updates."
            : "Use this or other preview environments to stage future updates."}
        </p>
        <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
        <ol className="list-decimal list-outside ml-4 mt-2">
          <li>
            <p className="mb-2">
              <span>Deploy staging changes to production</span>
              <CodeExample
                copyText={commands["merge_production"].user.merge}
                codeExampleText={commands["merge_production"].user.merge}
              />
            </p>
          </li>
          <li>
            <p className="mb-2 mt-2">
              <span>
                Now, use <code className="px-1">resources:set</code> with
                <code className="px-1">--count backend:2</code> to horizontally
                scale the backend app, and{" "}
                <code className="px-1">--size redis_service:0.5</code> to
                vertically scale the <code className="px-1">redis_service</code>{" "}
                service.
              </span>
              <CodeExample
                wrapLines
                copyText={commands["merge_production"].user.resources_set}
                codeExampleText={
                  commands["merge_production"].user.resources_set
                }
              />
            </p>
          </li>
          <li>
            <p className="mb-2 mt-2">
              <span>Open the production frontend in your browser</span>
              <CodeExample
                copyText={commands["merge_production"].user.get_url}
                codeExampleText={commands["merge_production"].user.get_url}
              />
            </p>
          </li>
        </ol>
      </>
    </FeatureStep>
  );
};

export default StepMergeProduction;

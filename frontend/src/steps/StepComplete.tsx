import React from "react";
import FeatureStep from "../components/FeatureStep";
import { ReactComponent as DoneIcon } from "../assets/utility/done.svg";
import commands from "../commands.json";
import CodeExample from "../components/CodeExample";

interface StepCompleteProps {
  isDisabled: boolean;
  hideContent: boolean;
}

const StepComplete: React.FC<StepCompleteProps> = ({
  isDisabled,
  hideContent,
}) => {
  return (
    <FeatureStep
      icon={<DoneIcon className="w-10 h-10 p-1" />}
      title="5. You did it!"
      isDisabled={isDisabled}
      hideBorder
      hideContent={hideContent}
    >
      <>
        <p className="mb-2 mt-2 font-bold">
          🎉 Kudos! You've aced the Upsun Demo!
        </p>
        <p className="mb-2">
          You've just experienced the power of Upsun's Git-based workflow to
          stage and deploy Redis seamlessly.
        </p>
        <p className="mb-2 mt-5">
          <span>
            You've used the Upsun CLI to merge a new service into production and
            to match the resources you worked with in staging to that
            environment. From here, you can{" "}
            <strong>scale those resources</strong> to whatever you need. For
            example, at this moment your production Redis service has 0.5 CPU.
            You can scale down the amount of resources on the production Redis
            service container with the following command:
          </span>
          <CodeExample
            wrapLines
            copyText={commands["scale"].user.resources_set}
            codeExampleText={commands["scale"].user.resources_set}
          />
        </p>
        <p className="mb-2 mt-5">
          <span>Delete this project when ready using:</span>
          <CodeExample
            copyText={commands.complete.user.delete_project}
            codeExampleText={commands.complete.user.delete_project}
          />
        </p>
        <h4 className="mt-5 text-lg font-semibold">What's next?</h4>
        <ul className="list-disc list-outside ml-8 mt-2">
          <li>
            <a
              href="https://docs.upsun.com/get-started/here.html"
              target="_blank"
              rel="noreferrer"
            >
              Migrate your application
            </a>
          </li>
          <li className="mt-2">
            Share your thoughts and connect with us on Discord.
          </li>
          <li className="mt-2">
            Explore Upsun's{" "}
            <a href="https://docs.upsun.com/manage-resources.html#horizontal-scaling">
              horizontal scalability features
            </a>
            .
          </li>
        </ul>
        <p className="mb-2 mt-4 font-semibold">
          Welcome to the Upsun Community!
        </p>
      </>
    </FeatureStep>
  );
};

export default StepComplete;

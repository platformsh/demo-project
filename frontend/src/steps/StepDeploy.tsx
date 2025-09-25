import React from "react";
import FeatureStep from "../components/FeatureStep";
import { ReactComponent as DoneIcon } from "../assets/utility/done.svg";
import commands from "../commands.json";
import { PROJECT_ID } from "../config";

const StepDeploy: React.FC = () => {
  return (
    <FeatureStep
      data-testid="branch"
      icon={<DoneIcon className="w-10 h-10 p-1" />}
      title="1. Deploy to Upsun"
      isDisabled // always completed
    >
      <>
        <p className="mb-4">
          <strong>Congrats!</strong> You've deployed this app to Upsun.
        </p>
        <div className="mb-4">
          By this point, you have:
          <br />
          <ul className="list-disc list-inside">
            <li className="mt-2 ml-6">
              Created a <em>project</em>, the Upsun counterpart to a{" "}
              <em>repository</em>.
            </li>
            <li className="mt-2 ml-6">Installed the Upsun CLI</li>
            <li className="mt-2 ml-6">
              Cloned the demo:{" "}
              <code className="ml-2 px-4">
                {commands.first_deploy.user.clone}
              </code>
            </li>
            <li className="mt-2 ml-6">
              Connected to Upsun:{" "}
              <code className="ml-2 px-4">
                {commands.first_deploy.user.set_remote} {PROJECT_ID}
              </code>
            </li>
            <li className="mt-2 ml-6">
              Pushed to Upsun:{" "}
              <code className="ml-2 px-4">
                {commands.first_deploy.user.push}
              </code>
            </li>
            <li className="mt-2 ml-6">
              Retrieved the deployed environment URL:{" "}
              <code className="ml-2 px-4">
                {commands.first_deploy.user.get_url}
              </code>
            </li>
          </ul>
        </div>
        <p className="mb-2">
          With the production environment now deployed, you can move on to the
          next step: creating preview environments to make your first revision!
        </p>
      </>
    </FeatureStep>
  );
};

export default StepDeploy;

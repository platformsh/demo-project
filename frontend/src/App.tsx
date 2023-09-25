import React, { useEffect, useRef, useState } from "react";
import { ENVIRONMENT_PATH, fetchEnvironment } from "./utility/api";
import { ReactComponent as RedisIcon } from "./assets/utility/service_redis.svg";
import { ReactComponent as DoneIcon } from "./assets/utility/done.svg";
import { ReactComponent as MergeIcon } from "./assets/utility/merge.svg";
import { ReactComponent as BranchIcon } from "./assets/utility/branch.svg";

import CopyButton from "./components/CopyButton";
import { API_BASE_URL } from "./config";
import ErrorPage from "./page/ErrorPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FeatureStep from "./components/FeatureStep";
import { CodeBlock, dracula } from "react-code-blocks";

function App() {
  const [environment, setEnvironment] = useState<string | null>(null);
  const [sessionStorageType, setSessionStorageType] = useState<string | null>(
    null,
  );
  const [fatalErrorMessage, setFatalErrorMessage] = useState<string | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<
    "branch" | "redis" | "merge-production" | "scale" | "complete" | null
  >("redis");
  const [currentStepProgress, setCurrentStepProgress] = useState<number>(1);

  const welcomeMessage =  useRef<HTMLDivElement>(null);
  const stepCreateProduction =  useRef<HTMLDivElement>(null);
  const stepCreateBranch = useRef<HTMLDivElement>(null);
  const stepCreateService = useRef<HTMLDivElement>(null);
  const stepMergeProduction = useRef<HTMLDivElement>(null);
  const stepAllComplete = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const servicesText = `###############################################################
# Step 3: Add a service. Uncomment this section.
###############################################################
      relationships:
          redis_session: "redis_persistent:redis"
      
services:
    redis_persistent:
        type: "redis-persistent:7.0"
###############################################################`

  useEffect(() => {
    fetchEnvironment()
      .then((envResponse) => {
        const { type, session_storage } = envResponse;
        setEnvironment(type && type.charAt(0).toUpperCase() + type.slice(1));
        setSessionStorageType(session_storage);
      })
      .catch((error) =>
        setFatalErrorMessage("There was a problem fetching environment data."),
      );
  }, []);

  useEffect(() => {
    if(environment === null) return
    if(sessionStorageType === null) return

    switch (true) {
      case sessionStorageType === "file" &&
        environment?.toLocaleLowerCase() === "production":
        setCurrentStep("branch");
        setCurrentStepProgress(1);
        scrollToRef(welcomeMessage);
        break;
      case environment?.toLocaleLowerCase() !== "production" &&
        sessionStorageType === "file":
        setCurrentStep("redis");
        setCurrentStepProgress(2);
        scrollToRef(welcomeMessage);
        break;
      case environment?.toLocaleLowerCase() !== "production" &&
        sessionStorageType === "redis":
        setCurrentStep("merge-production");
        setCurrentStepProgress(3);
        scrollToRef(stepMergeProduction);
        break;
      case environment?.toLocaleLowerCase() === "production" &&
        sessionStorageType === "redis":
        setCurrentStep("complete");
        setCurrentStepProgress(4);
        scrollToRef(stepAllComplete);
        break;
      default:
        setCurrentStep("complete");
        setCurrentStepProgress(4);
        scrollToRef(stepAllComplete);
        break;
    }
  }, [environment, sessionStorageType]);

  if (fatalErrorMessage)
    return (
      <ErrorPage header="We cannot fetch your data">
        <p className="mb-2">
          {" "}
          There was an error fetching data from your Python backend at{" "}
          <code className="px-2 py-1">
            {API_BASE_URL}/{ENVIRONMENT_PATH}
          </code>
        </p>
        <p className="">
          {" "}
          Please check your app logs using{" "}
          <code className="px-2 py-1">upsun environment:log</code>
        </p>
      </ErrorPage>
    );

  return (
    <>
      <div
        className={`max-w-7xl w-fill px-6 2xl:pl-0 m-auto transition duration-500`}
      >
        <Header />
        <main className="border-t-[1px] border-upsun-violet-600 flex flex-col sm:flex-row">
          <Sidebar
            environment={environment}
            sessionStorageType={sessionStorageType}
          />
          <section className="border-t-2 border-upsun-violet-600 w-full sm:w-3/4">
            <div ref={welcomeMessage} className="content-intro sm:w-3/4 mx-auto mt-12 mb-12">
                <div className="welcome-message flex p-4 justify-center items-center space-x-2.5 rounded-md border border-upsun-violet-600 bg-upsun-violet-900 font-mono text-xs leading-6 ">
                  Welcome to your Upsun Demo Guide project, a Python and Node.js multiapp designed to run on Upsun and teach you about it’s unique features.
                </div>

              {currentStepProgress < 3 && <EnvironmentIntroduction environment={environment} />}

              {/* STEP 1 - INITIAL DEPLOYMENT CONFIRMATION */}
              <div className="pt-8 flex flex-col gap-2">
                <FeatureStep
                  data-testid="branch"
                  ref={stepCreateProduction}
                  icon={<DoneIcon className="w-10 h-10 p-1" />}
                  title={"1. Deploy to Upsun"}
                  isDisabled // This step is always completed because the app is intended to be viewed on Upsun
                >
                  <>
                    <p className="mb-4">
                      <strong>Congrats!</strong> You now have the Upsun Demo Guide deployed to a production environment.
                    </p>
                    <div className="mb-4">
                      By this point you have:
                      <br />
                      <ul className="list-disc list-inside">
                        <li className="mt-2 ml-6">Created a <em>project</em>, the Upsun counterpart to a <em>repository</em>.</li>
                        <li className="mt-2 ml-6">Installed the Upsun CLI</li>
                        <li className="mt-2 ml-6">Cloned the demo: <code className="ml-2 px-4">git clone git@github.com:platformsh/demo-project.git</code></li>
                        <li className="mt-2 ml-6">Connected to Upsun: <code className="ml-2 px-4">upsun project:set-remote {process.env.REACT_APP_PROJECT_ID}</code></li>
                        <li className="mt-2 ml-6">Pushed to Upsun: <code className="ml-2 px-4">upsun push</code></li>
                        <li className="mt-2 ml-6">Defined deployment resources: <code className="ml-2 px-4">upsun resources:set --size '*:1'</code></li>
                        <li className="mt-2 ml-6">Retrieved the deployed environment URL: <code className="ml-2 px-4">upsun url --primary</code></li>
                      </ul>
                    </div>
                    <p className="mb-2">
                      With the production environment now deployed, you can move onto the next step:
                      creating preview environments to make your first revision!
                    </p>
                  </>
                </FeatureStep>

                {/* STEP 2 - CREATE A PREVIEW ENVIRONMENT */}
                <FeatureStep
                  data-testid="branch"
                  ref={stepCreateBranch}
                  icon={<BranchIcon className="w-10 h-10 p-1" />}
                  title={"2. Create your first preview environment"}
                  isDisabled={currentStep !== "branch"}
                >
                  <>
                    <p className="mb-2">
                      With Upsun, you can clone any environment to get a
                      byte-for-byte copy to use for staging, features, and
                      bugfixes.
                    </p>
                    <p className="mb-2">
                      Before you make your first revision, create a new preview environment called <code className="px-2">staging</code>.
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step:</h4>
                    <p className="mb-2 mt-2">
                      <span>Create environment: </span>
                      <CopyButton className="pl-1 hidden sm:inline-block w" copyText="upsun branch staging --type staging">
                        <code className="px-2 py-1">upsun branch staging --type staging</code>
                      </CopyButton>
                    </p>
                    <p className="mb-2 mt-2">
                    <span>
                      Once deployed, visit the hosted environment:
                    </span>
                      <CopyButton className="pl-1 hidden sm:inline-block w" copyText="upsun url --primary">
                        <code className="px-2 py-1">upsun url --primary</code>
                      </CopyButton>
                    </p>
                  </>
                </FeatureStep>

                {/* STEP 3 - PUSH SERVICE TO THE PREVIEW ENVIRONMENT */}
                <FeatureStep
                  data-testid="add-redis"
                  ref={stepCreateService}
                  icon={<RedisIcon className="w-10 h-10" />}
                  title={"3. Add a Redis service"}
                  isDisabled={currentStep !== "redis"}
                  hideContent={currentStepProgress < 2}
                >
                  <>
                    <p className="mb-2">
                      You now have a dedicated preview environment <code className="px-4">staging</code> that is ready for you to push revisions to.
                      It is a true staging environment.
                      That is, it is a <em>byte-level copy</em> of your production environment <code className="px-4">main</code>.
                    </p>
                    <p className="mb-2">
                      You have exact copies of the application containers in this new isolated, <em>"as-much-like-production-as-possible"</em> space
                      to verify that changes made here will behave identically when promoted to production.
                    </p>
                    <p className="mb-2">
                      Locally, you should be checked out to the <code className="px-4">staging</code> branch, which you can verify by running
                      <CopyButton className="hidden sm:inline-block w" copyText="git branch">
                        <code className="px-4">git branch</code>.
                      </CopyButton>
                      In a your editor, open the <code className="px-4">.upsun/config.yaml</code> file, which acts as the primary configuration file
                      for deploying things on Upsun.
                    </p>
                    <p className="mb-2">
                      There are three top-level keys that configure the environment: <code className="px-4">applications</code>
                      (which contains configuration for the two apps in the project, <code className="px-4">frontend</code> and <code className="px-4">backend</code>),
                      <code className="px-4">routes</code> (which defines how traffic is directed to those two apps), and <code className="px-4">services</code>
                      which you will define now.
                    </p>
                    <p className="mb-2">
                      Upsun provides <em>managed services</em> that can quickly be added to your project with a few lines of YAML, rather than with length provisioning configuration.
                    </p>
                    <p className="mb-2">
                      Towards the bottom of that file, uncomment the section titled <code className="px-4">Step 3: Add a service</code> so it appears like the snippet below
                    </p>

                    <p className="mb-2 code-block">
                      <CodeBlock
                        text={servicesText}
                        language='yaml'
                        showLineNumbers={true}
                        theme={dracula}
                        startingLineNumber={72}
                      />
                    </p>

                    <p className="mb-2 mt-4">
                      Once you have done so, commit those changes:
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="git commit -am 'Add Redis service and relationship.'">
                        <code className="px-4">git commit -am 'Add Redis service and relationship.'</code>
                      </CopyButton>
                    </p>
                    <p className="mb-2 mt-4">
                      And then push to Upsun:
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun push">
                        <code className="px-4">upsun push</code>
                      </CopyButton>
                    </p>
                    <blockquote className="mb-2 mt-4 p-4 rounded-md border border-upsun-violet-600 bg-upsun-violet-900">
                      <p className="mb-2 mt-2">
                        <strong>Heads up!</strong>
                      </p>
                      <p className="mb-2 mt-2">
                        Once you push this service, Upsun will build and <em>attempt</em> to deploy your project.
                        <em>However</em>, until you define the resources you would like to make available for that service,
                        the deployment will fail. Run the next command to define resources and move onto the next step.
                      </p>
                    </blockquote>
                    <p className="mb-2 mt-4">
                      Once Upsun asks for the resources definition for Redis, run:
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512">
                        <code className="px-4">upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512</code>
                      </CopyButton>
                    </p>
                    <p className="mb-2 mt-4">
                      When the activity has completed, just refresh this page.
                    </p>
                  </>

                </FeatureStep>

                {/* STEP 3 - MERGE PREVIEW ENVIRONMENT INTO PRODUCTION */}
                <FeatureStep
                  ref={stepMergeProduction}
                  icon={<MergeIcon className="w-10 h-10" />}
                  title={"4. Merge staging into production"}
                  isDisabled={currentStep !== "merge-production"}
                  hideContent={currentStepProgress < 3}
                >
                  <>
                    <p className="mb-2">
                      Great! You've made the required changes and deployed
                      them to {environment?.toLocaleLowerCase()}.
                    </p>
                    <p className="mb-2">
                      In the future, any further changes that you want to make
                      can be implemented here or in other preview
                      environments.
                    </p>
                    <p className="mb-2 mt-4">
                      Now that the service has been added in the isolated preview environment, you can promote it to production. Run:
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun merge staging">
                        <code className="px-4">upsun merge staging</code>
                      </CopyButton>
                    </p>
                    <p className="mb-2 mt-4">
                      You will once again need to set the resources for the production environment and its new service, so rerun the command below
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512 -e main">
                        <code className="px-4">upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512 -e main</code>
                      </CopyButton>
                    </p>
                    <p className="mb-2 mt-4">
                      When the activity has completed, you can revisit the production environment state by running the command below:
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun url --primary -e main">
                        <code className="px-4">upsun url --primary -e main</code>
                      </CopyButton>
                    </p>
                  </>
                </FeatureStep>

                {/* Step 5 - DEMO COMPLETED */}
                <FeatureStep
                  ref={stepAllComplete}
                  icon={<DoneIcon className="w-10 h-10 p-1" />}
                  title={"5. You did it!"}
                  isDisabled={currentStep !== "complete"}
                  hideBorder
                  hideContent={currentStepProgress !== 4}
                >
                  <>
                    <p className="mb-2 mt-2">
                      Congratulations! You’ve connected the service and explored the basic workflow of Upsun.
                      With everything - including infrastructure - based in Git, you can branch and experiment in
                      preview environments prior to merging that change into your production site.
                    </p>
                    <p className="mb-2 mt-4">
                      All the while, you have strict control over the resources available to each container and environment,
                      for either replicating production exactly, or using fewer resources in non-production environments.
                    </p>
                    <p className="mb-2 mt-4">
                      With the demo complete, feel free to delete this project if you wish with the command below.
                    </p>
                    <p className="mb-2 mt-4">
                      <CopyButton className="hidden sm:inline-block w" copyText="upsun project:delete -p {process.env.REACT_APP_PROJECT_ID}">
                        <code className="px-4">upsun project:delete -p {process.env.REACT_APP_PROJECT_ID}</code>
                      </CopyButton>
                    </p>
                    <div className="mb-2 mt-4">
                      Otherwise, here are a few things you can do next!<br />
                      <ul>
                        <li className="mt-2 ml-6">   - <strong><a href="https://docs.upsun.com/get-started.html">Migrate your own project</a>:</strong> Visit the <a href="https://docs.upsun.com/get-started.html">Upsun documentation</a> for a collection of Getting started guides for a number of common frameworks.</li>
                        <li className="mt-2 ml-6">   - <strong><a href="#">Join us on Discord</a>:</strong> Let us know what you thought of this demo, what your experience has been like working with Upsun, and just come and say "Hi" by <a href="#">joining us on Discord</a>!</li>
                      </ul>
                    </div>
                    <p className="mb-2 mt-4">
                      <strong>Welcome to the Upsun community!</strong>
                    </p>
                  </>
                </FeatureStep>
              </div>
            </div>
          </section>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

interface EnvironmentIntroductionProps {
  environment: string | null;
}

const EnvironmentIntroduction: React.FC<EnvironmentIntroductionProps> = ({
  environment,
}) => {
  if (environment === null) return <></>;

  return (
    <>
      {environment && environment.toLocaleLowerCase() === "production" ? (
        <ProductionIntroduction />
      ) : (
        <StagingIntroduction />
      )}
    </>
  );
};

const ProductionIntroduction = () => {
  return (
    <>
      <p className="text-sm leading-6 mt-6 mb-4 text-lg font-bold">
        Congrats! You’ve deployed the Upsun Demo Guide project to a production environment 🎉
      </p>
      <p className="text-sm leading-6 mt-2">
        This app is the React frontend of your demo project’s production
        environment, which is associated with the default branch of the repository: <code className="px-2 py-1">main</code>.
        With it now deployed, we can add features, services, and runtimes from preview environments -
        which are actually byte-for-byte copies of production.<br /><br />
        Follow the steps below to get started!
      </p>
    </>
  );
};

const StagingIntroduction = () => {
  return (
    <>
      <p className="text-sm leading-6 mt-6 mb-4 text-lg font-bold">
        Congrats! You’ve created your staging environment 🎉
      </p>
      <p className="text-sm leading-6 mt-2">
        This space represents your byte-for-byte copy of production. You can use
        staging and development environments to preview and share changes prior
        to pushing them to production.
      </p>
      <p className="text-sm leading-6 mt-2">
        This app uses the Upsun environment variable{" "}
        <code className="px-2 py-1">$UPSUN_ENVIRONMENT="staging"</code> to
        modify the content of this page.
      </p>
      <p className="text-sm leading-6 mt-2">
        Return to the steps below to continue adding your Redis service.
      </p>
    </>
  );
};

export default App;

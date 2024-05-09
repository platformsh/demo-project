import React, { useEffect, useRef, useState } from "react";
import { ENVIRONMENT_PATH, fetchEnvironment } from "./utility/api";
import { ReactComponent as RedisIcon } from "./assets/utility/service_redis.svg";
import { ReactComponent as DoneIcon } from "./assets/utility/done.svg";
import { ReactComponent as MergeIcon } from "./assets/utility/merge.svg";
import { ReactComponent as BranchIcon } from "./assets/utility/branch.svg";
import { ReactComponent as ProductionIcon } from "./assets/utility/production.svg";
import { ReactComponent as StagingIcon } from "./assets/utility/staging.svg";

import CopyButton from "./components/CopyButton";
import { API_BASE_URL } from "./config";
import ErrorPage from "./page/ErrorPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FeatureStep from "./components/FeatureStep";
import { CodeBlock } from "react-code-blocks";
import UpsunCodeTheme from "./theme/code";
import CodeExample from "./components/CodeExample";

import { PROJECT_ID } from "./config";

import commands from "./commands.json";
import DesignDebugger from "./theme/debug/DesignDebugger";

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

  const welcomeMessage = useRef<HTMLDivElement>(null);
  const stepCreateProduction = useRef<HTMLDivElement>(null);
  const stepCreateBranch = useRef<HTMLDivElement>(null);
  const stepCreateService = useRef<HTMLDivElement>(null);
  const stepMergeProduction = useRef<HTMLDivElement>(null);
  const stepAllComplete = useRef<HTMLDivElement>(null);
  const debugEnabled =
    process.env.REACT_APP_ENABLE_DESIGN_DEBUG &&
    process.env.REACT_APP_ENABLE_DESIGN_DEBUG !== "false" &&
    process.env.REACT_APP_ENABLE_DESIGN_DEBUG !== "0";
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesText = `###############################################################
# Step 3: Add a service. Uncomment this section.
###############################################################
        relationships:
            redis_session: 
                service: "redis_service"
                endpoint: "redis"
services:
    redis_service:
        type: "redis:7.0"
###############################################################`;

  const setEnvironmentDetails = async () => {
    return fetchEnvironment().then((envResponse) => {
      const { type, session_storage } = envResponse;
      setEnvironment(type && type.charAt(0).toUpperCase() + type.slice(1));
      setSessionStorageType(session_storage);
      setFatalErrorMessage(null);
    });
  };

  useEffect(() => {
    setEnvironmentDetails().catch(() => {
      setFatalErrorMessage("There was a problem fetching environment data.");
    });
  }, []);

  useEffect(() => {
    if (debugEnabled) return;

    const pollEnvironment = setInterval(() => {
      setEnvironmentDetails().catch(() => {
        console.info(
          "Could not poll for new environment data. The target server may be redeploying.",
        );
      });
    }, 2000); // Poll every 1 second

    return () => clearInterval(pollEnvironment);
  }, [debugEnabled]);

  useEffect(() => {
    if (environment === null) return;
    if (sessionStorageType === null) return;

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

  const DesignDebug = () => {
    return debugEnabled ? (
      <DesignDebugger
        defaultEnvironment={environment}
        defaultStorage={sessionStorageType}
        defaultErrorState={fatalErrorMessage}
        onEnvironmentChange={(environment) => setEnvironment(environment)}
        onStorageChange={(storageType) => setSessionStorageType(storageType)}
        onErrorChange={(errorState) => setFatalErrorMessage(errorState)}
      />
    ) : null;
  };

  if (fatalErrorMessage)
    return (
      <ErrorPage header="We cannot fetch your data">
        <DesignDebug />
        <p className="mt-2 mb-2">
          {" "}
          There was an error fetching data from your Python backend at{" "}
        </p>
        <p>
          <code className="px-2 py-1">
            {API_BASE_URL}/{ENVIRONMENT_PATH}
          </code>
        </p>
        <p className="mt-2 mb-2"> Please check your app logs using </p>
        <p>
          <code className="px-2 py-1">{commands.error.user.get_logs}</code>
        </p>
      </ErrorPage>
    );

  return (
    <>
      <DesignDebug />
      <div
        className={`max-w-7xl w-fill px-6 2xl:pl-0 m-auto transition duration-500`}
      >
        <Header />
        <main className="border-t-[1px] border-upsun-violet-600 flex flex-col sm:flex-row">
          <Sidebar />
          <section className="border-t-2 border-upsun-violet-600 w-full sm:w-3/4">
            <div
              ref={welcomeMessage}
              className="content-intro sm:w-3/4 mx-auto mt-6 mb-12"
            >
              <div className="aside-title flex flex-row gap-4 items-center mb-2">
                {environment?.toLowerCase() === "production" ? (
                  <ProductionIcon className="w-[32px] h-[32px]" />
                ) : (
                  <StagingIcon className="w-[32px] h-[32px]" />
                )}
                <h1 data-testid={"title"} className="text-xl">
                  {environment}
                </h1>
              </div>

              {currentStepProgress < 3 && (
                <EnvironmentIntroduction environment={environment} />
              )}

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
                      <strong>Congrats!</strong> You now have the Upsun Demo
                      Guide deployed to a production environment.
                    </p>
                    <div className="mb-4">
                      By this point you have:
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
                      With the production environment now deployed, you can move
                      onto the next step: creating preview environments to make
                      your first revision!
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
                      Before you make your first revision, let's create a new
                      preview environment called <strong>Staging</strong>.
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li className="">
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
                          <span>
                            Once deployed, open environment in browser
                          </span>
                          <CodeExample
                            copyText={commands.branch.user.get_url}
                            codeExampleText={commands.branch.user.get_url}
                          />
                        </p>
                      </li>
                    </ol>
                  </>
                </FeatureStep>

                {/* STEP 3 - PUSH SERVICE TO THE PREVIEW ENVIRONMENT */}
                <FeatureStep
                  data-testid="add-redis"
                  ref={stepCreateService}
                  icon={<RedisIcon className="w-10 h-10" />}
                  title={"3. Add Redis to staging"}
                  isDisabled={currentStep !== "redis"}
                  hideContent={currentStepProgress < 2}
                >
                  <>
                    <p className="mb-2">
                      Great! Your preview environment{" "}
                      {environment?.toLocaleLowerCase() === "production" ? (
                        ""
                      ) : (
                        <code className="px-1">staging</code>
                      )}{" "}
                      is live and mirrors your production setup.
                    </p>
                    <p className="mb-2">
                      We'll use this preview environment as a sandbox to stage
                      the addition of a Redis service. Once happy, we'll commit
                      the changes using <code className="px-1">git</code> and
                      then merge it into production.
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li className="">
                        <p className="mb-2">
                          Create the relationship. Open{" "}
                          <CopyButton
                            className="inline-block"
                            copyText=".upsun/config.yaml"
                          >
                            <code className="px-2">.upsun/config.yaml</code>
                          </CopyButton>{" "}
                          and uncomment the following lines
                        </p>
                        <p className="mb-2 code-block">
                          <CodeBlock
                            text={servicesText}
                            language="yaml"
                            showLineNumbers={true}
                            theme={UpsunCodeTheme}
                            startingLineNumber={67}
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Commit</span>
                          <CodeExample
                            copyText={commands.redis.user.commit}
                            codeExampleText={commands.redis.user.commit}
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Push</span>
                          <CodeExample
                            copyText={commands.redis.user.push}
                            codeExampleText={commands.redis.user.push}
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Refresh this page when done.</span>
                        </p>
                      </li>
                    </ol>
                  </>
                </FeatureStep>

                {/* STEP 3 - MERGE PREVIEW ENVIRONMENT INTO PRODUCTION */}
                <FeatureStep
                  ref={stepMergeProduction}
                  icon={<MergeIcon className="w-10 h-10" />}
                  title={"4. Merge changes into production & scale up"}
                  isDisabled={currentStep !== "merge-production"}
                  hideContent={currentStepProgress < 3}
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
                        ? "Use your preview environments to stage any future updates."
                        : "Use this or other preview environments to stage any future updates."}
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li>
                        <p className="mb-2">
                          <span>Deploy staging changes to production</span>
                          <CodeExample
                            copyText={commands["merge_production"].user.merge}
                            codeExampleText={
                              commands["merge_production"].user.merge
                            }
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>
                            Now, use <code className="px-1">resources:set</code>{" "}
                            with
                            <code className="px-1">--count backend:2</code> to
                            horizontally scale the backend app and{" "}
                            <code className="px-1">
                              --size redis_service:0.5
                            </code>{" "}
                            to vertically scale the{" "}
                            <code className="px-1">redis_service</code> service.
                          </span>
                          <CodeExample
                            wrapLines
                            copyText={
                              commands["merge_production"].user.resources_set
                            }
                            codeExampleText={
                              commands["merge_production"].user.resources_set
                            }
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Open production frontend in your browser</span>
                          <CodeExample
                            copyText={commands["merge_production"].user.get_url}
                            codeExampleText={
                              commands["merge_production"].user.get_url
                            }
                          />
                        </p>
                      </li>
                    </ol>
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
                    <p className="mb-2 mt-2 font-bold">
                      🎉 Kudos! You've aced the Upsun Demo!
                    </p>
                    <p className="mb-2">
                      You've just experienced the power of Upsun's Git-based
                      workflow to stage and deploy Redis seamlessly.
                    </p>
                    <p className="mb-2 mt-5">
                      {/* <span>Upsun automatically allocated a set of default resources for each service in your project, but you can <strong>scale 
                        those resources</strong> to whatever you need. For example, you can scale down the amount of resources on the
                        Redis service container with the following command:
                      </span> */}
                      <span>
                        You've used the Upsun CLI to merge a new service into
                        production, and to match the resources you worked with
                        in staging to that environment. From here, you can{" "}
                        <strong>scale those resources</strong> to whatever you
                        need. For example, at this moment your production Redis
                        service has 0.5 CPU. You can scale down the amount of
                        resources on the production Redis service container with
                        the following command:
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
    <div
      data-testid={`${environment.toLocaleLowerCase()}-intro`}
      className={`rounded-lg mt-4 p-4 bg-upsun-black-900`}
    >
      <>
        {environment && environment.toLocaleLowerCase() === "production" ? (
          <ProductionIntroduction />
        ) : (
          <StagingIntroduction />
        )}
      </>
    </div>
  );
};

const ProductionIntroduction = () => {
  return (
    <>
      <p className="text-sm leading-6 text-lg mb-2">
        Congrats! You’ve deployed the Upsun Demo Guide project to a production
        environment 🎉
      </p>
      <p className="text-sm leading-6">
        This app is the React frontend of your demo project’s production
        environment, which is associated with the default branch of the
        repository: <code className="px-2 py-1">main</code>. With it now
        deployed, we can add features, services, and runtimes in preview
        environments - which are byte-for-byte copies of production.
      </p>
    </>
  );
};

const StagingIntroduction = () => {
  return (
    <>
      <p className="text-sm leading-6 text-lg mb-2">
        Congrats! You’ve created your staging environment 🎉
      </p>
      <p className="text-sm leading-6">
        This space represents your byte-for-byte copy of production. You can use
        staging and development environments to preview and share changes prior
        to pushing them to production.
      </p>
      <p className="text-sm leading-6">
        This app uses the Upsun environment variable{" "}
        <code className="px-2 py-1">$PLATFORM_ENVIRONMENT="staging"</code> to
        modify the content of this page.
      </p>
      <p className="text-sm leading-6">
        Return to the steps below to continue adding your Redis service.
      </p>
    </>
  );
};

export default App;

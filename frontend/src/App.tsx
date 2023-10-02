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

  const welcomeMessage = useRef<HTMLDivElement>(null);
  const stepCreateProduction = useRef<HTMLDivElement>(null);
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
    if (environment === null) return
    if (sessionStorageType === null) return

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
                Welcome to your Upsun Demo Guide project, a Python and Node.js multiapp designed to run on Upsun and teach you about its unique features.
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
                      Before you make your first revision, let's create a new preview environment called <code className="px-2">staging</code>.
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li className="">
                        <p className="mb-2 mt-2">
                          <span>Create environment</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText="upsun branch staging --type staging">
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text="upsun branch staging --type staging"
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>
                            Once deployed, open environment in browser
                          </span>
                          <CopyButton className="pl-1 inline-block w-full" copyText="upsun url --primary">
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text="upsun url --primary"
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
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
                  title={"3. Add a Redis service"}
                  isDisabled={currentStep !== "redis"}
                  hideContent={currentStepProgress < 2}
                >
                  <>
                    <p className="mb-2">
                      Great! Your preview environment {environment?.toLocaleLowerCase() === "production" ? "" : <code className="px-1">staging</code>} is live and mirrors your production setup.
                    </p>
                    <p className="mb-2">
                      We'll use this preview environment as a sandbox to stage the addition of a Redis service. Once happy, we'll bring it into production using <code className='px-1'>git merge</code>.
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li className="">
                        <p className="mb-2">
                          Create the relationship. Open <CopyButton className="inline-block" copyText=".upsun/config.yaml">
                            <code className="px-2">.upsun/config.yaml</code></CopyButton> and uncomment the following lines
                        </p>
                        <p className="mb-2 code-block">
                          <CodeBlock
                            text={servicesText}
                            language='yaml'
                            showLineNumbers={true}
                            theme={dracula}
                            startingLineNumber={66}
                          />
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Commit and push</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText={`git commit -am "Create a redis service"\nupsun push`}>
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text={`git commit -am "Create a redis service"\nupsun push`}
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Allocate Redis resources</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText={`upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512`}>
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text={`upsun resources:set --size redis_persistent:0.5 --disk redis_persistent:512`}
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
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
                  title={"4. Merge staging into production"}
                  isDisabled={currentStep !== "merge-production"}
                  hideContent={currentStepProgress < 3}
                >
                  <>
                    <p className="mb-2">
                      {environment?.toLocaleLowerCase() === "production"
                        ? <>Awesome! Your changes are live.</>
                        : <>Awesome! Your changes are live in {environment?.toLocaleLowerCase()}.</>
                      }
                    </p>
                    <p className="mb-2">

                    {environment?.toLocaleLowerCase() === "production"
                        ? "Use your preview environments to stage any future updates."
                        : "Use this or other preview environments to stage any future updates."
                      }
                      
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
                    <ol className="list-decimal list-outside ml-4 mt-2">
                      <li>
                        <p className="mb-2">
                          <span>Deploy staging changes to production</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText="upsun merge staging">
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text="upsun merge staging"
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                        The previous step will complete, but exit with the message: <span className="text-red-400 font-mono">Resources must be configured before deployment</span>.
                        </p>
                        <p className="mb-2 mt-2">
                          <span>Allocate resources to Redis in production.</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText={`upsun resources:set\n\t--size redis_persistent:0.5\n\t--disk redis_persistent:512\n\t -e main`}>
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text={`upsun resources:set\n\t--size redis_persistent:0.5\n\t--disk redis_persistent:512\n\t -e main`}
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
                        </p>
                      </li>
                      <li>
                        <p className="mb-2 mt-2">
                          <span>Open production frontend in your browser</span>
                          <CopyButton className="pl-1 inline-block w-full" copyText="upsun url --primary -e main">
                            <p className="mb-2 mt-2 code-block">
                              <CodeBlock
                                text="upsun url --primary -e main"
                                showLineNumbers={false}
                                theme={dracula}
                              />
                            </p>
                          </CopyButton>
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
                    <p className="mb-2 mt-2 font-bold">🎉 Kudos! You've aced the Upsun Demo!</p>
                    <p className="mb-2">
                      You've just experienced the power of Upsun's Git-based workflow to stage and deploy Redis seamlessly.
                    </p>
                    <p className="mb-2 mt-5">
                      <span>Delete this project when ready using:</span>
                      <CopyButton className="pl-1 inline-block w-full" copyText="upsun project:delete">
                        <p className="mb-2 mt-2 code-block">
                          <CodeBlock
                            text="upsun project:delete"
                            showLineNumbers={false}
                            theme={dracula}
                          />
                        </p>
                      </CopyButton>
                    </p>
                    <h4 className="mt-5 text-lg font-semibold">What's next? Dive deeper</h4>
                    <ul className="list-disc list-outside ml-8 mt-2">
                      <li>
                        <a href="https://docs.upsun.com/get-started.html">Migrate your application</a>
                      </li>
                      <li className="mt-2">
                        Share your thoughts and connect with us <a href="https://docs.upsun.com/learn/overview/get-support.html#community">on Discord</a>.
                      </li>
                      <li className="mt-2">
                        Explore our scalability features <a href="https://docs.upsun.com/learn/overview/get-support.html#community">on Discord</a>.
                      </li>
                    </ul>
                    <p className="mb-2 mt-4 font-semibold">Welcome to the Upsun Community!</p>
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
        With it now deployed, we can add features, services, and runtimes in preview environments -
        which are byte-for-byte copies of production.<br /><br />
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
        <code className="px-2 py-1">$PLATFORM_ENVIRONMENT="staging"</code> to
        modify the content of this page.
      </p>
      <p className="text-sm leading-6 mt-2">
        Return to the steps below to continue adding your Redis service.
      </p>
    </>
  );
};

export default App;

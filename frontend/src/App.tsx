import React, { useEffect, useRef, useState } from "react";
import { ENVIRONMENT_PATH, fetchEnvironment } from "./utility/api";
import { ReactComponent as ProductionIcon } from "./assets/utility/production.svg";
import { ReactComponent as StagingIcon } from "./assets/utility/staging.svg";

import { API_BASE_URL } from "./config";
import ErrorPage from "./page/ErrorPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import commands from "./commands.json";
import DesignDebugger from "./theme/debug/DesignDebugger";
import EnvironmentIntroduction from "./components/EnvironmentIntroduction";
import StepDeploy from "./steps/StepDeploy";
import StepBranch from "./steps/StepBranch";
import StepRedis from "./steps/StepRedis";
import StepMergeProduction from "./steps/StepMergeProduction";
import StepComplete from "./steps/StepComplete";

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
                <StepDeploy />

                {/* STEP 2 - CREATE A PREVIEW ENVIRONMENT */}
                <StepBranch isDisabled={currentStep !== "branch"} />

                {/* STEP 3 - PUSH SERVICE TO THE PREVIEW ENVIRONMENT */}
                <StepRedis
                  isDisabled={currentStep !== "redis"}
                  hideContent={currentStepProgress < 2}
                  environment={environment}
                />

                {/* STEP 4 - MERGE PREVIEW ENVIRONMENT INTO PRODUCTION */}
                <StepMergeProduction
                  isDisabled={currentStep !== "merge-production"}
                  hideContent={currentStepProgress < 3}
                  environment={environment}
                />

                {/* Step 5 - DEMO COMPLETED */}
                <StepComplete
                  isDisabled={currentStep !== "complete"}
                  hideContent={currentStepProgress !== 4}
                />
              </div>
            </div>
          </section>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default App;

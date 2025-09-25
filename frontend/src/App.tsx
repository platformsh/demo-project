import React from "react";
import { ENVIRONMENT_PATH } from "./utility/api";
import { ReactComponent as ProductionIcon } from "./assets/utility/production.svg";
import { ReactComponent as StagingIcon } from "./assets/utility/staging.svg";

import { API_BASE_URL } from "./config";
import ErrorPage from "./page/ErrorPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import commands from "./commands.json";
import EnvironmentIntroduction from "./components/EnvironmentIntroduction";
import StepDeploy from "./steps/StepDeploy";
import StepBranch from "./steps/StepBranch";
import StepRedis from "./steps/StepRedis";
import StepMergeProduction from "./steps/StepMergeProduction";
import StepComplete from "./steps/StepComplete";

import { useEnvironmentSteps } from "./hooks/useEnvironmentSteps";
import DesignDebug from "./components/DesignDebug";

function parseBooleanEnvVar(value: string | undefined): boolean {
  if (!value) return false;
  return !["false", "0"].includes(value.toLowerCase());
}

function App() {
  const debugEnabled = parseBooleanEnvVar(
    process.env.REACT_APP_ENABLE_DESIGN_DEBUG,
  );

  const {
    environment,
    sessionStorageType,
    fatalErrorMessage,
    currentStep,
    currentStepProgress,
    setEnvironment,
    setSessionStorageType,
    setFatalErrorMessage,
    welcomeMessage,
    stepMergeProduction,
    stepAllComplete,
  } = useEnvironmentSteps(debugEnabled);

  if (fatalErrorMessage)
    return (
      <ErrorPage header="We cannot fetch your data">
        <DesignDebug
          enabled={debugEnabled}
          environment={environment}
          storage={sessionStorageType}
          errorState={fatalErrorMessage}
          onEnvironmentChange={setEnvironment}
          onStorageChange={setSessionStorageType}
          onErrorChange={setFatalErrorMessage}
        />
        <p className="mt-2 mb-2">
          There was an error fetching data from your Python backend at
        </p>
        <p>
          <code className="px-2 py-1">
            {API_BASE_URL}/{ENVIRONMENT_PATH}
          </code>
        </p>
        <p className="mt-2 mb-2">Please check your app logs using</p>
        <p>
          <code className="px-2 py-1">{commands.error.user.get_logs}</code>
        </p>
      </ErrorPage>
    );

  return (
    <>
      <DesignDebug
        enabled={debugEnabled}
        environment={environment}
        storage={sessionStorageType}
        errorState={fatalErrorMessage}
        onEnvironmentChange={setEnvironment}
        onStorageChange={setSessionStorageType}
        onErrorChange={setFatalErrorMessage}
      />
      <div className="max-w-7xl w-fill px-6 2xl:pl-0 m-auto transition duration-500">
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

              <div className="pt-8 flex flex-col gap-2">
                <StepDeploy />
                <StepBranch isDisabled={currentStep !== "branch"} />
                <StepRedis
                  isDisabled={currentStep !== "redis"}
                  hideContent={currentStepProgress < 2}
                  environment={environment}
                />
                <div ref={stepMergeProduction}>
                  <StepMergeProduction
                    isDisabled={currentStep !== "merge-production"}
                    hideContent={currentStepProgress < 3}
                    environment={environment}
                  />
                </div>
                <div ref={stepAllComplete}>
                  <StepComplete
                    isDisabled={currentStep !== "complete"}
                    hideContent={currentStepProgress !== 4}
                  />
                </div>
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

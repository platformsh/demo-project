// hooks/useEnvironmentSteps.ts
import { useEffect, useRef, useState } from "react";
import { fetchEnvironment } from "../utility/api";

type Step =
  | "branch"
  | "redis"
  | "merge-production"
  | "scale"
  | "complete"
  | null;

export function useEnvironmentSteps(debugEnabled: boolean) {
  const [environment, setEnvironment] = useState<string | null>(null);
  const [sessionStorageType, setSessionStorageType] = useState<string | null>(
    null,
  );
  const [fatalErrorMessage, setFatalErrorMessage] = useState<string | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<Step>("redis");
  const [currentStepProgress, setCurrentStepProgress] = useState<number>(1);

  const welcomeMessage = useRef<HTMLDivElement>(null);
  const stepMergeProduction = useRef<HTMLDivElement>(null);
  const stepAllComplete = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setEnvironmentDetails = async () => {
    return fetchEnvironment().then((envResponse) => {
      const { type, session_storage } = envResponse;
      setEnvironment(type && type.charAt(0).toUpperCase() + type.slice(1));
      setSessionStorageType(session_storage);
      setFatalErrorMessage(null);
    });
  };

  // Fetch environment on mount
  useEffect(() => {
    setEnvironmentDetails().catch(() => {
      setFatalErrorMessage("There was a problem fetching environment data.");
    });
  }, []);

  // Polling
  useEffect(() => {
    if (debugEnabled) return;
    const pollEnvironment = setInterval(() => {
      setEnvironmentDetails().catch(() => {
        console.info("Polling failed, server may be redeploying.");
      });
    }, 2000);
    return () => clearInterval(pollEnvironment);
  }, [debugEnabled]);

  // Step progression logic
  useEffect(() => {
    if (!environment || !sessionStorageType) return;

    const envLower = environment.toLowerCase();

    switch (true) {
      case sessionStorageType === "file" && envLower === "production":
        setCurrentStep("branch");
        setCurrentStepProgress(1);
        scrollToRef(welcomeMessage);
        break;
      case envLower !== "production" && sessionStorageType === "file":
        setCurrentStep("redis");
        setCurrentStepProgress(2);
        scrollToRef(welcomeMessage);
        break;
      case envLower !== "production" && sessionStorageType === "redis":
        setCurrentStep("merge-production");
        setCurrentStepProgress(3);
        scrollToRef(stepMergeProduction);
        break;
      case envLower === "production" && sessionStorageType === "redis":
      default:
        setCurrentStep("complete");
        setCurrentStepProgress(4);
        scrollToRef(stepAllComplete);
        break;
    }
  }, [environment, sessionStorageType]);

  return {
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
  };
}

import React from "react";
import DesignDebugger from "../theme/debug/DesignDebugger";

type Props = {
  enabled: boolean;
  environment: string | null; // allow null, matches DesignDebugger
  storage: string | null; // allow null too
  errorState: string | null;
  onEnvironmentChange: (environment: string | null) => void;
  onStorageChange: (storage: string | null) => void;
  onErrorChange: (error: string | null) => void;
};

export default function DesignDebug({
  enabled,
  environment,
  storage,
  errorState,
  onEnvironmentChange,
  onStorageChange,
  onErrorChange,
}: Props) {
  if (!enabled) return null;

  return (
    <DesignDebugger
      defaultEnvironment={environment}
      defaultStorage={storage}
      defaultErrorState={errorState}
      onEnvironmentChange={onEnvironmentChange}
      onStorageChange={onStorageChange}
      onErrorChange={onErrorChange}
    />
  );
}

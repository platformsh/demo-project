import React from "react";
import ProductionIntroduction from "./ProductionIntroduction";
import StagingIntroduction from "./StagingIntroduction";

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
      className="rounded-lg mt-4 p-4 bg-upsun-black-900"
    >
      {environment?.toLocaleLowerCase() === "production" ? (
        <ProductionIntroduction />
      ) : (
        <StagingIntroduction />
      )}
    </div>
  );
};

export default EnvironmentIntroduction;

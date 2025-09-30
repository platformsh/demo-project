import React from "react";

const ProductionIntroduction: React.FC = () => {
  return (
    <>
      <p className="text-sm leading-6 text-lg mb-2">
        Congrats! You’ve deployed the Upsun Demo Guide project to a production
        environment 🎉
      </p>
      <p className="text-sm leading-6">
        This app is the React frontend of your demo project’s production
        environment, which is associated with the default branch of the
        repository, <code className="px-2 py-1">main</code>. With it now
        deployed, we can add features, services, and runtimes in preview
        environments—which are byte-for-byte copies of production.
      </p>
    </>
  );
};

export default ProductionIntroduction;

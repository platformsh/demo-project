import React from "react";

const StagingIntroduction: React.FC = () => {
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

export default StagingIntroduction;

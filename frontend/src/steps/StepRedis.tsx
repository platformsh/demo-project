import React from "react";
import FeatureStep from "../components/FeatureStep";
import { ReactComponent as RedisIcon } from "../assets/utility/service_redis.svg";
import { CodeBlock } from "react-code-blocks";
import UpsunCodeTheme from "../theme/code";
import CopyButton from "../components/CopyButton";
import commands from "../commands.json";
import CodeExample from "../components/CodeExample";

interface StepRedisProps {
  isDisabled: boolean;
  hideContent: boolean;
  environment: string | null;
}

const StepRedis: React.FC<StepRedisProps> = ({
  isDisabled,
  hideContent,
  environment,
}) => {
  const servicesText = `###############################################################
# Step 3: Add a service. Uncomment this section.
###############################################################
        relationships:
            redis_session: "redis_service:redis"

services:
    redis_service:
        type: "redis:7.0"
###############################################################`;

  return (
    <FeatureStep
      data-testid="add-redis"
      icon={<RedisIcon className="w-10 h-10" />}
      title="3. Add Redis to staging"
      isDisabled={isDisabled}
      hideContent={hideContent}
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
          We'll use this preview environment as a sandbox to stage the addition
          of a Redis service. Once happy, we'll commit the changes using{" "}
          <code className="px-1">git</code> and then merge it into production.
        </p>
        <h4 className="mt-5 text-lg font-semibold">Next Step</h4>
        <ol className="list-decimal list-outside ml-4 mt-2">
          <li>
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
                showLineNumbers
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
  );
};

export default StepRedis;

import React, { useEffect, useState } from "react";

interface FeatureStepProps {
  icon: React.ReactNode;
  title: string;
  isDisabled?: boolean;
  hideContent?: boolean;
  hideBorder?: boolean;
  children?: React.ReactNode;
}

const FeatureStep: React.FC<FeatureStepProps> = ({
  icon,
  title,
  isDisabled,
  hideContent,
  hideBorder,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(!isDisabled)
  }, [isDisabled])

  return (
    <div
      data-testid="feature-step"
      className={`feature--step flex flex-col ${isDisabled && !isExpanded && "is-disabled"}`}
    >
      <div className="aside-title flex flex-row gap-4 items-center">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className={`border-l-2 ml-5 pl-10 ${(hideContent || !children) && !hideBorder && "h-10"}`}>
        {!hideContent && children && (
          <div className={`rounded-lg p-4 bg-upsun-black-900 transition-all duration-300`}>
            <>
              <div className={`${isDisabled && !isExpanded && "line-clamp-1"} transition-all duration-300`}>
                {children}
              </div>
              {isDisabled &&
                <button
                  style={{ pointerEvents: 'auto' }}
                  className="text-white underline pt-5 cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              }
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureStep;

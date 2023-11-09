import React, { useEffect, useState, forwardRef, ForwardedRef } from "react";

interface FeatureStepProps {
  icon: React.ReactNode;
  title: string;
  isDisabled?: boolean;
  hideContent?: boolean;
  hideBorder?: boolean;
  children?: React.ReactNode;
  ref?: HTMLElement;
}

const FeatureStep = forwardRef<HTMLDivElement, FeatureStepProps>(
  (
    {
      icon,
      title,
      isDisabled,
      hideContent,
      hideBorder,
      children,
    }: FeatureStepProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      setIsExpanded(!isDisabled);
    }, [isDisabled]);

    return (
      <div className={"group relative"}>
        <div
          ref={ref}
          data-testid="feature-step"
          className={`feature--step flex flex-col transition-all duration-300 ${
            (isDisabled && !isExpanded && "is-disabled") || ""
          } ${!hideContent && "group-hover:opacity-100"}`}
        >
          <div className="aside-title flex flex-row gap-4 items-center">
            {icon}
            <h2 className="font-semibold">{title}</h2>
          </div>
          <div
            className={`border-l-2 ml-5 pl-10 ${
              (hideContent || !children) && !hideBorder && "h-10"
            }`}
          >
            {!hideContent && children && (
              <div className={`rounded-lg p-4 bg-upsun-black-900`}>
                <>
                  <div
                    className={`${
                      (isDisabled && !isExpanded && "line-clamp-1") || ""
                    }`}
                  >
                    {children}
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
        {isDisabled && !hideContent && (
          <button
            style={{ pointerEvents: "auto" }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white pt-1 pr-1 cursor-pointer absolute top-0 right-0 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  },
);

export default FeatureStep;

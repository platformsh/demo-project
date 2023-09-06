import React, { useState } from "react";
import { ReactComponent as ShareIcon } from "../assets/utility/share.svg";
import * as Tooltip from "@radix-ui/react-tooltip";

function ShareButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const shareContent = {
    title: "Upsun Demo Project",
    text: "Check out this demo project running on Upsun!",
    url: window.location.href,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share(shareContent)
        .then(() => console.log("Content shared successfully!"))
        .catch((error) => console.log("Share failed:", error));
    } else {
      // If Web Share API is not supported, copy the URL to clipboard
      navigator.clipboard
        .writeText(shareContent.url)
        .then(() => {
          setTooltipOpen(true);
          setTimeout(() => {
            setTooltipOpen(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy URL:", err);
        });
    }
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={tooltipOpen} defaultOpen={false}>
        <Tooltip.Trigger asChild>
          <button onClick={handleShare} className="">
            <ShareIcon className="h-[51px] w-[92px]" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            align="start"
            alignOffset={5}
            sideOffset={10}
          >
            Copied!
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default ShareButton;

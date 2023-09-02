import React, { useState, ButtonHTMLAttributes } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

type CopyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  copyText: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ copyText, ...props }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setHasCopied(true);
      setTooltipOpen(true);
      // Reset after a certain delay if you want, e.g., 2 seconds
      setTimeout(() => {
        setHasCopied(false);
        setTooltipOpen(false);
      }, 2000);
    });
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={tooltipOpen} defaultOpen={false}>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleCopyToClipboard}
            className="IconButton w-12"
            {...props}
          >
            {props.children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" align="start" alignOffset={5} sideOffset={10}>
            Copied!
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CopyButton;

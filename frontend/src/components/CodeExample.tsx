import React, { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { ReactComponent as CopyIcon } from "../assets/utility/copy.svg";

interface CodeExampleProps {
  copyText: string;
  codeExampleText: React.ReactNode;
  wrapLines?: boolean;
}

const CodeExample: React.FC<CodeExampleProps> = ({
  copyText,
  codeExampleText,
  wrapLines,
}: CodeExampleProps) => {
  const [copied, setCopied] = useState(false);
  const [showCopiedText, setShowCopiedText] = useState(false);
  const [doWrapLines, setDoWrapLines] = useState(wrapLines || false);

  useEffect(() => {
    setDoWrapLines(wrapLines || false);
  }, [wrapLines]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (copied) {
      setShowCopiedText(true); // Immediately show "Copied!" when copied.
      timer = setTimeout(() => {
        setShowCopiedText(false); // Hide "Copied!" after 1.5s, allowing fade-out.
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  // Additional effect to hide the copy icon while "Copied!" is visible.
  useEffect(() => {
    if (showCopiedText) {
      setCopied(true);
    } else {
      // Delay setting 'copied' to false to prevent the icon from showing too soon.
      const timer = setTimeout(() => {
        setCopied(false);
      }, 300); // Should match the fade-out transition time.
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showCopiedText]);

  return (
    <CopyButton
      className="pl-1 inline-block w-full"
      copyText={copyText}
      hideTooltip
      onCopy={() => {
        setCopied(true);
      }}
    >
      <p className="mb-2 mt-2 code-block group/copy-box">
        <code className="px-2 py-1.5 w-full flex flex-row">
          <span
            className={`w-full text-left ${
              doWrapLines
                ? "whitespace-pre-wrap"
                : "whitespace-nowrap overflow-auto"
            }`}
          >
            {codeExampleText}
          </span>
          <span className="text-white flex flex-row items-center">
            <span
              className={`h-full transition-opacity duration-300 ${
                showCopiedText ? "opacity-100" : "opacity-0"
              }`}
            >
              Copied!
            </span>
            {!copied && (
              <CopyIcon className="h-5 transition-opacity duration-300 ease-in opacity-0 group-hover/copy-box:opacity-100" />
            )}
          </span>
        </code>
      </p>
    </CopyButton>
  );
};

export default CodeExample;

import React, { useMemo } from "react";
import { Refractor, registerLanguage } from "react-refractor";
import yaml from "refractor/yaml";

registerLanguage(yaml);

interface CodeBlockProps {
  text: string;
  language?: "yaml" | "javascript";
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  className?: string;
}

export default function CodeBlock({
  text,
  language = "yaml",
  showLineNumbers = true,
  startingLineNumber = 1,
  className,
}: CodeBlockProps) {
  const lines = useMemo(() => text.split("\n"), [text]);

  const numbers = lines
    .map((_, i) => String(startingLineNumber + i))
    .join("\n");

  return (
    <pre
      className={`flex ${className || ""} overflow-x-auto`}
      data-starting-line-number={startingLineNumber}
      data-testid="code-block"
    >
      {showLineNumbers && (
        <div
          className="text-right text-gray-400 select-none"
          data-starting-line-number={startingLineNumber}
        >
          <Refractor
            language="text"
            value={numbers}
            inline={false}
            className="!rounded-r-none !pr-0"
          />
        </div>
      )}
      <div className="flex-1" data-starting-line-number={startingLineNumber}>
        <Refractor
          language={language}
          value={text}
          inline={false}
          className="!rounded-l-none"
        />
      </div>
    </pre>
  );
}

import React, { useMemo } from "react";
import { Refractor, registerLanguage } from "react-refractor";
import yaml from "refractor/yaml";

registerLanguage(yaml);

type Theme = Record<string, React.CSSProperties>;

interface CodeBlockProps {
  text: string;
  language?: "yaml" | "javascript"
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  theme?: Theme;
  className?: string;
}

export default function CodeBlock({
  text,
  language = "yaml"
}: CodeBlockProps) {
  const lines = useMemo(() => text.split("\n"), [text]);
  
  return <Refractor language={language} value={text} inline={false} />;
}

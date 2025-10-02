import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import StepRedis from "./StepRedis";

function getSnippetStartLine(filePath: string, marker: string) {
  const contents = fs.readFileSync(filePath, "utf-8").split("\n");
  const idx = contents.findIndex((line) => line.includes(marker));
  if (idx === -1) throw new Error(`Marker "${marker}" not found`);
  return idx + 1;
}

describe("<StepRedis />", () => {
  it("renders with correct title", async () => {
    render(
      <StepRedis
        isDisabled={false}
        hideContent={false}
        environment="staging"
      />,
    );
    expect(
      await screen.findByText("3. Add Redis to staging"),
    ).toBeInTheDocument();
  });

  it("applies disabled state when isDisabled=true", async () => {
    render(
      <StepRedis isDisabled={true} hideContent={false} environment="staging" />,
    );
    expect(await screen.findByTestId("step-redis")).toHaveClass("is-disabled");
  });

  it("renders one mocked code block for gutter and one for code", async () => {
    render(
      <StepRedis
        isDisabled={false}
        hideContent={false}
        environment="staging"
      />,
    );

    const block = screen.getByTestId("code-block");

    expect(block).toBeInTheDocument();
  });

  it("uses the correct startingLineNumber based on config.yaml", () => {
    const filePath = path.resolve(process.cwd(), "../.upsun/config.yaml");
    const expectedLineNumber = getSnippetStartLine(
      filePath,
      "#add_service_start",
    );

    render(
      <StepRedis
        isDisabled={false}
        hideContent={false}
        environment="staging"
      />,
    );

    const block = screen.getByTestId("code-block");

    expect(block).toHaveAttribute(
      "data-starting-line-number",
      String(expectedLineNumber),
    );
  });
});

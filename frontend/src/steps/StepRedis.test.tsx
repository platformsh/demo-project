import { render, screen } from "@testing-library/react";
import StepRedis from "./StepRedis";

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

  it("renders the mocked code block instead of the real one", async () => {
    render(
      <StepRedis
        isDisabled={false}
        hideContent={false}
        environment="staging"
      />,
    );

    expect(await screen.findByTestId("mocked-code-block")).toBeInTheDocument();
  });
});

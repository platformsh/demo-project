import { render, screen } from "@testing-library/react";
import StepMergeProduction from "./StepMergeProduction";

describe("<StepMergeProduction />", () => {
  it("renders with correct title", () => {
    render(
      <StepMergeProduction
        isDisabled={false}
        hideContent={false}
        environment="staging"
      />,
    );
    expect(
      screen.getByText("4. Merge changes into production & scale up"),
    ).toBeInTheDocument();
  });

  it("applies disabled state when isDisabled=true", () => {
    render(
      <StepMergeProduction
        isDisabled={true}
        hideContent={false}
        environment="staging"
      />,
    );
    expect(screen.getByTestId("step-merge-production")).toHaveClass(
      "is-disabled",
    );
  });
});

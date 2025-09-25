import { render, screen } from "@testing-library/react";
import StepDeploy from "./StepDeploy";

describe("<StepDeploy />", () => {
  it("renders the deploy step with correct title", () => {
    render(<StepDeploy />);
    expect(screen.getByText("1. Deploy to Upsun")).toBeInTheDocument();
  });

  it("is always disabled", () => {
    render(<StepDeploy />);
    expect(screen.getByTestId("step-deploy")).toHaveClass("is-disabled");
  });
});

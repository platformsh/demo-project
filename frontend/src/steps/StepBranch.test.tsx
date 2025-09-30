import { render, screen } from "@testing-library/react";
import StepBranch from "./StepBranch";

describe("<StepBranch />", () => {
  it("renders with correct title", () => {
    render(<StepBranch isDisabled={false} />);
    expect(
      screen.getByText("2. Create your first preview environment"),
    ).toBeInTheDocument();
  });

  it("applies disabled state when isDisabled=true", () => {
    render(<StepBranch isDisabled={true} />);
    expect(screen.getByTestId("step-branch")).toHaveClass("is-disabled");
  });
});

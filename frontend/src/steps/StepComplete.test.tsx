import { render, screen } from "@testing-library/react";
import StepComplete from "./StepComplete";

describe("<StepComplete />", () => {
  it("renders with correct title", () => {
    render(<StepComplete isDisabled={false} hideContent={false} />);
    expect(screen.getByText("5. You did it!")).toBeInTheDocument();
  });

  it("applies disabled state when isDisabled=true", () => {
    render(<StepComplete isDisabled={true} hideContent={false} />);
    expect(screen.getByTestId("step-complete")).toHaveClass("is-disabled");
  });
});

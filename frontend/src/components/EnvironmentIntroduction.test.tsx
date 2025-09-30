import { render, screen } from "@testing-library/react";
import EnvironmentIntroduction from "./EnvironmentIntroduction";

describe("<EnvironmentIntroduction />", () => {
  it("renders production intro when environment=production", () => {
    render(<EnvironmentIntroduction environment="Production" />);
    expect(screen.getByTestId("production-intro")).toBeInTheDocument();
  });

  it("renders staging intro when environment=staging", () => {
    render(<EnvironmentIntroduction environment="Staging" />);
    expect(screen.getByTestId("staging-intro")).toBeInTheDocument();
  });

  it("renders nothing when environment=null", () => {
    const { container } = render(
      <EnvironmentIntroduction environment={null} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

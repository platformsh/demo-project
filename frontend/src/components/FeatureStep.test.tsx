import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FeatureStep from "./FeatureStep"; // Adjust the import to your file structure

describe("FeatureStep component", () => {
  it("renders without crashing", () => {
    render(
      <FeatureStep
        icon={<span>Icon</span>}
        title="Test Title"
        isDisabled={false}
      />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("displays the icon", () => {
    render(
      <FeatureStep
        icon={<span>Icon</span>}
        title="Test Title"
        isDisabled={false}
      />,
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("displays children when provided", () => {
    render(
      <FeatureStep
        icon={<span>Icon</span>}
        title="Test Title"
        isDisabled={false}
      >
        <div>Child content</div>
      </FeatureStep>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it('adds "is-disabled" class when isDisabled is true', () => {
    render(
      <FeatureStep
        icon={<span>Icon</span>}
        title="Test Title"
        isDisabled={true}
      />,
    );
    expect(screen.getByTestId("feature-step")).toHaveClass("is-disabled");
  });

  it('does not add "is-disabled" class when isDisabled is false', () => {
    render(
      <FeatureStep
        icon={<span>Icon</span>}
        title="Test Title"
        isDisabled={false}
      />,
    );
    expect(screen.getByTestId("feature-step")).not.toHaveClass("is-disabled");
  });
});

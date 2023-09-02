import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

test("renders header and children", () => {
  const headerText = "Test Header";
  const childrenText = "Test Children";

  render(<ErrorPage header={headerText}>{childrenText}</ErrorPage>);

  const headerElement = screen.getByText(headerText);
  const childrenElement = screen.getByText(childrenText);

  expect(headerElement).toBeInTheDocument();
  expect(childrenElement).toBeInTheDocument();
});

test("renders header and children (with React component)", () => {
  const headerText = "Test Header";
  const TestComponent = () => (
    <div>
      <p>Line 1</p>
      <p>Line 2</p>
    </div>
  );

  render(
    <ErrorPage header={headerText}>
      <TestComponent />
    </ErrorPage>,
  );

  const headerElement = screen.getByText(headerText);
  const testComponentLine1 = screen.getByText("Line 1");
  const testComponentLine2 = screen.getByText("Line 2");

  expect(headerElement).toBeInTheDocument();
  expect(testComponentLine1).toBeInTheDocument();
  expect(testComponentLine2).toBeInTheDocument();
});

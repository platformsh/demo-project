import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders header component", () => {
  render(<Header />);

  // Assert that the component is rendered correctly
  const headerComponent = screen.getByTitle("Powered by Upsun");
  expect(headerComponent).toBeInTheDocument();

  // Assert that the logo component is rendered
  const logoComponent = screen.getByTitle("Powered by Upsun");
  expect(logoComponent).toBeInTheDocument();

  // Assert that the text "Demo project" is rendered
  const demoProjectText = screen.getAllByText("Demo Guide Project");
  expect(demoProjectText).toHaveLength(2);

  // Assert that the share button component is rendered
  const shareButtonComponent = screen.getByText(/share/i);
  expect(shareButtonComponent).toBeInTheDocument();
});

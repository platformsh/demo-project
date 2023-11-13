import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Draggable from "./Draggable";

describe("Draggable", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ x: 50, y: 50 }));
    Storage.prototype.setItem = jest.fn();
  });

  it("renders children", () => {
    render(
      <Draggable>
        <div>Test Child</div>
      </Draggable>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("updates position on drag", () => {
    render(
      <Draggable>
        <div>Test Child</div>
      </Draggable>,
    );
    const draggableElement = screen.getByTestId("draggable");

    // Simulate mouse down
    fireEvent.mouseDown(draggableElement, { clientX: 50, clientY: 50 });

    // Simulate mouse move
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });

    // Simulate mouse up
    fireEvent.mouseUp(document);

    // Check if the position was updated
    expect(draggableElement.style.left).toBe("50px");
    expect(draggableElement.style.top).toBe("50px");
  });

  it("saves position to localStorage on mouse up", () => {
    // Set initial position
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ x: 0, y: 0 }));

    render(
      <Draggable>
        <div>Test Child</div>
      </Draggable>,
    );
    const draggableElement = screen.getByTestId("draggable");

    // Simulate a drag operation
    fireEvent.mouseDown(draggableElement, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(document);

    // Assuming the draggable element updates its position after a drag,
    // the new position would be something like { x: 100, y: 100 }
    // This will depend on how your component calculates the new position
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "draggablePosition",
      JSON.stringify({ x: 100, y: 100 }),
    );
  });
});

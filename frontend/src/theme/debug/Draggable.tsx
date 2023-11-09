import React, { useState, useRef, useEffect } from "react";

interface DraggableProps {
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const initialPosition = JSON.parse(
    localStorage.getItem("draggablePosition") || '{ "x": 0, "y": 0 }',
  );
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
    setIsDragging(true);
  };

  useEffect(() => {
    const onMouseUp = () => {
      setIsDragging(false);
      localStorage.setItem("draggablePosition", JSON.stringify(position));
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        let newX = event.clientX - offset.x;
        let newY = event.clientY - offset.y;

        // Boundary checks
        if (ref.current) {
          const maxX = window.innerWidth - ref.current.offsetWidth;
          const maxY = window.innerHeight - ref.current.offsetHeight;

          if (newX < 0) newX = 0;
          if (newY < 0) newY = 0;
          if (newX > maxX) newX = maxX;
          if (newY > maxY) newY = maxY;

          setPosition({ x: newX, y: newY });
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, offset.x, offset.y, position]);

  return (
    <div
      ref={ref}
      data-testid={"draggable"}
      onMouseDown={onMouseDown}
      className="absolute z-50 cursor-grab select-none bg-gray-300 rounded flex flex-col justify-center items-center"
      style={{ left: position.x, top: position.y }}
    >
      <div className="bg-gray-500 text-white text-sm font-bold p-1 rounded-t w-full flex justify-between items-center">
        <span>Debugger (Drag Me)</span>
        <span className="text-2xl">⤱</span>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Draggable;

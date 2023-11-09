import React, { useState } from "react";
import Draggable from "./Draggable";

interface DesignDebuggerProps {
  defaultEnvironment?: string | null;
  defaultStorage?: string | null;
  defaultErrorState?: string | null;
  onEnvironmentChange?: (environment: string | null) => void;
  onStorageChange?: (storageType: string | null) => void;
  onErrorChange?: (error: string | null) => void;
}

const DesignDebugger: React.FC<DesignDebuggerProps> = (props) => {
  const [environment, setEnvironment] = useState<string | null>(
    props.defaultEnvironment || "production",
  );
  const [sessionStorageType, setSessionStorageType] = useState<string | null>(
    props.defaultStorage || "file",
  );
  const [fatalErrorMessage, setFatalErrorMessage] = useState<string | null>(
    props.defaultErrorState || null,
  );

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEnvironment(value);
    props.onEnvironmentChange && props.onEnvironmentChange(value);
  };

  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSessionStorageType(value);
    props.onStorageChange && props.onStorageChange(value);
  };

  const handleErrorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorMessage = e.target.checked ? "Emulated error message" : null;
    setFatalErrorMessage(errorMessage);
    props.onErrorChange && props.onErrorChange(errorMessage);
  };

  return (
    <Draggable>
      <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-md shadow-sm">
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium">Environment:</label>
          <select
            data-testid={"environmentInput"}
            value={environment || ""}
            onChange={handleEnvironmentChange}
            className="ml-2 border p-2 rounded-md text-gray-600"
          >
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Development">Development</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium">Session Storage:</label>
          <select
            data-testid={"sessionStorageTypeInput"}
            value={sessionStorageType || ""}
            onChange={handleStorageChange}
            className="ml-2 border p-2 rounded-md text-gray-600"
          >
            <option value="file">File</option>
            <option value="redis">Redis</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium mr-2">
            Emulate Error:
          </label>
          <input
            data-testid={"fatalErrorInput"}
            type="checkbox"
            checked={fatalErrorMessage !== null}
            onChange={handleErrorChange}
            className="border rounded-md"
          />
        </div>
      </div>
    </Draggable>
  );
};

export default DesignDebugger;

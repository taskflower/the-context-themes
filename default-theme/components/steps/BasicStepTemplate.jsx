// src/components/steps/BasicStepTemplate.jsx
import React, { useState, useEffect } from "react";
import { useContextStore } from "@/hooks/useContextStore";

const BasicStepTemplate = ({
  node,
  onSubmit,
  onPrevious,
  isLastNode,
}) => {
  const [userInput, setUserInput] = useState("");
  const processTemplate = useContextStore((s) => s.processTemplate);
  
  // Process message with template engine
  const processedMessage = node.assistantMessage ? 
    processTemplate(node.assistantMessage) : "";
  
  // Check if we have initial data from context
  useEffect(() => {
    if (node.contextPath) {
      const context = useContextStore.getState().getContext();
      const value = useContextStore.getState().getContextPath(node.contextPath);
      if (value && typeof value === 'string') {
        setUserInput(value);
      }
    }
  }, [node.contextPath]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    onSubmit(userInput);
    setUserInput("");
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="whitespace-pre-line">{processedMessage}</p>
      </div>

      <div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Enter your response..."
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={!userInput.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isLastNode ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default BasicStepTemplate;
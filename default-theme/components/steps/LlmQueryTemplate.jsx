// src/components/steps/LlmQueryTemplate.jsx
import React, { useState, useEffect } from "react";
import { useLLM } from "@/hooks/useLLM";

const LlmQueryTemplate = ({ node, onSubmit, onPrevious, isLastNode }) => {
  const [userInput, setUserInput] = useState("");
  
  // Use the useLLM hook to properly handle API calls
  const {
    sendMessage,
    isLoading,
    error,
    responseData,
    processedInitialMessage,
    processedAssistantMessage,
    schema,
    handleAutoStart
  } = useLLM({
    initialUserMessage: node.initialUserMessage,
    assistantMessage: node.assistantMessage,
    systemMessage: node.includeSystemMessage ? node?.scenario?.systemMessage : undefined,
    schemaPath: node.attrs?.schemaPath,
    contextPath: node.contextPath,
    autoStart: node.attrs?.autoStart,
    onDataSaved: (data) => {
      if (data) {
        onSubmit(data);
      }
    }
  });

  // Handle form submission
  const handleSubmit = () => {
    if (!userInput.trim() || isLoading) return;
    sendMessage(userInput);
    setUserInput("");
  };

  // If auto-start is enabled and we have response, show it
  useEffect(() => {
    if (node.attrs?.autoStart && !isLoading && responseData) {
      // Auto-continue after a short delay if we have data
      const timer = setTimeout(() => {
        onSubmit(responseData);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [node.attrs?.autoStart, isLoading, responseData, onSubmit]);

  return (
    <div className="space-y-4">
      {processedAssistantMessage && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="whitespace-pre-line">{processedAssistantMessage}</p>
        </div>
      )}

      {!node.attrs?.autoStart && (
        <div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Enter your query..."
            disabled={isLoading}
          ></textarea>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2">Processing...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>Error: {error}</p>
        </div>
      )}

      {responseData && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Response:</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-60">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}

      {!node.attrs?.autoStart && (
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={isLoading}
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !userInput.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      )}

      {node.attrs?.autoStart && responseData && (
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>

          <button
            onClick={() => onSubmit(responseData)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default LlmQueryTemplate;
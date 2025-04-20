import React, { useState } from "react";

const BasicStepTemplate = ({
  node,
  onSubmit,
  onPrevious,
  isLastNode,
}) => {
  const [userInput, setUserInput] = useState("");
  
  // W rzeczywistej implementacji używalibyśmy contextStore
  const processedMessage = node.assistantMessage || "";

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
          placeholder="Wpisz swoją odpowiedź..."
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="px-4 py-2 bg-gray-200 rounded">
          Wstecz
        </button>

        <button
          onClick={handleSubmit}
          disabled={!userInput.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isLastNode ? "Zakończ" : "Dalej"}
        </button>
      </div>
    </div>
  );
};

export default BasicStepTemplate;
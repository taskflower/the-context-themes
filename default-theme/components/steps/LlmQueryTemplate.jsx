import React, { useState } from "react";

const LlmQueryTemplate = ({
  node,
  onSubmit,
  onPrevious,
  isLastNode,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  
  // W rzeczywistej implementacji używalibyśmy useLLM
  const processedMessage = node.assistantMessage || "";

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Symulacja odpowiedzi AI
    setTimeout(() => {
      const mockResponse = {
        content: "To jest przykładowa odpowiedź AI na: " + userInput
      };
      
      setResponse(mockResponse);
      setIsLoading(false);
      
      // Wysyłamy odpowiedź do następnego kroku
      onSubmit(mockResponse);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {processedMessage && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="whitespace-pre-line">{processedMessage}</p>
        </div>
      )}

      <div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Wpisz swoje zapytanie..."
          disabled={isLoading}
        ></textarea>
      </div>

      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2">Przetwarzanie...</span>
        </div>
      )}

      {response && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Odpowiedź:</h3>
          <p>{response.content}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button 
          onClick={onPrevious} 
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={isLoading}
        >
          Wstecz
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !userInput.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isLoading ? "Wysyłanie..." : "Wyślij"}
        </button>
      </div>
    </div>
  );
};

export default LlmQueryTemplate;
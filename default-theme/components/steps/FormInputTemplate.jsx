// src/components/steps/FormInputTemplate.jsx
import React from "react";
import { useFormInput } from "@/hooks/useFormInput";

const FormInputTemplate = ({ node, onSubmit, onPrevious, isLastNode }) => {
  // Use the hook to properly connect to context store
  const {
    formData,
    formFields,
    processedAssistantMessage,
    handleChange,
    handleSubmit,
    areRequiredFieldsFilled,
  } = useFormInput({ node });

  // Wrap the original submit with the one from props to proceed to next step
  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = handleSubmit(e);
    onSubmit(data);
  };

  return (
    <div className="space-y-4">
      {processedAssistantMessage && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="whitespace-pre-line">{processedAssistantMessage}</p>
        </div>
      )}

      <form onSubmit={onFormSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "number" ? (
              <input
                type="number"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
                rows={4}
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!areRequiredFieldsFilled()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
          >
            {isLastNode ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInputTemplate;
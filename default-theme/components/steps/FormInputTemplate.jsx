import React, { useState } from "react";

const FormInputTemplate = ({ node, onSubmit, onPrevious, isLastNode }) => {
  const [formData, setFormData] = useState({});
  
  // W rzeczywistej implementacji używalibyśmy useFormInput i useContextStore
  const processedMessage = node.assistantMessage || "";
  const formFields = node.attrs?.fields || [];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const areRequiredFieldsFilled = () =>
    formFields.every(
      (f) => !f.required || (formData[f.name] !== undefined && formData[f.name] !== "")
    );

  return (
    <div className="space-y-4">
      {processedMessage && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="whitespace-pre-line">{processedMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700 mb-1">
              {field.label}{field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'number' ? (
              <input
                type="number"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button type="button" onClick={onPrevious} className="px-4 py-2 bg-gray-200 rounded-md">
            Wstecz
          </button>
          <button type="submit" disabled={!areRequiredFieldsFilled()} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300">
            {isLastNode ? 'Zakończ' : 'Dalej'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInputTemplate;
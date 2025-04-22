// flowSteps/SimpleFlowStep.js
const React = require('react');

// Rejestracja flow step w systemie szablonów
function registerFlowStep(registerFunction) {
  // Definicja prostego flow step
  const SimpleFlowStep = (props) => {
    const { node, onSubmit, onPrevious, isLastNode } = props;
    
    // Stan dla formularza
    const [formData, setFormData] = React.useState({});
    
    // Pobierz pola formularza z atrybutów node
    const getFormFields = () => {
      // W rzeczywistej implementacji pobieralibyśmy to z kontekstu
      // na podstawie schemaPath z node.attrs
      const defaultFields = [
        {
          name: "name",
          label: "Nazwa",
          type: "text",
          required: true
        },
        {
          name: "description",
          label: "Opis",
          type: "text",
          required: false
        }
      ];
      
      return defaultFields;
    };
    
    // Aktualizuj formData przy zmianie pola
    const handleChange = (name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Obsługa submitu formularza
    const handleSubmit = (e) => {
      if (e) e.preventDefault();
      onSubmit(formData);
    };
    
    // Sprawdź, czy wszystkie wymagane pola są wypełnione
    const areRequiredFieldsFilled = () => {
      const formFields = getFormFields();
      return formFields.every(field => 
        !field.required || 
        (formData[field.name] !== undefined && formData[field.name] !== "")
      );
    };
    
    return React.createElement('div', {
      className: 'bg-white shadow rounded-lg p-6'
    }, [
      // Tytuł kroku
      React.createElement('h2', {
        key: 'title',
        className: 'text-xl font-semibold mb-4 text-gray-800'
      }, node.label || 'Step'),
      
      // Wiadomość asystenta
      node.assistantMessage ? React.createElement('div', {
        key: 'message',
        className: 'mb-6 p-4 bg-blue-50 rounded-lg'
      }, node.assistantMessage) : null,
      
      // Formularz
      React.createElement('form', {
        key: 'form',
        onSubmit: handleSubmit,
        className: 'space-y-4'
      }, [
        // Pola formularza
        ...getFormFields().map(field => {
          return React.createElement('div', {
            key: field.name,
            className: 'mb-4'
          }, [
            // Etykieta
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-700 mb-1'
            }, [
              field.label,
              field.required ? React.createElement('span', {
                key: 'required',
                className: 'text-red-500 ml-1'
              }, '*') : null
            ]),
            
            // Pole input
            React.createElement('input', {
              key: 'input',
              type: field.type || 'text',
              name: field.name,
              value: formData[field.name] || '',
              onChange: (e) => handleChange(field.name, e.target.value),
              className: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
              required: field.required
            })
          ])
        }),
        
        // Przyciski nawigacji
        React.createElement('div', {
          key: 'buttons',
          className: 'flex justify-between pt-4'
        }, [
          // Przycisk Wstecz
          React.createElement('button', {
            key: 'back',
            type: 'button',
            onClick: onPrevious,
            className: 'px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
          }, 'Wstecz'),
          
          // Przycisk Dalej/Zakończ
          React.createElement('button', {
            key: 'next',
            type: 'submit',
            disabled: !areRequiredFieldsFilled(),
            className: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed'
          }, isLastNode ? 'Zakończ' : 'Dalej')
        ])
      ])
    ]);
  };
  
  // Rejestracja w systemie
  registerFunction({
    id: 'simple-flow-step',
    name: 'Simple Flow Step',
    compatibleNodeTypes: ['default', 'form'],
    component: SimpleFlowStep
  });
}

// Rejestracja przy ładowaniu
registerFlowStep((flowStep) => {
  // Ta funkcja zostanie zastąpiona przez rzeczywistą funkcję registerFlowStep z systemu
  if (typeof registerFlowStep === 'function') {
    registerFlowStep(flowStep);
  } else {
    console.warn('Flow step registration function not available');
  }
});

module.exports = {
  register: registerFlowStep
};
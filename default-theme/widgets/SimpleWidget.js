// widgets/SimpleWidget.js
const React = require('react');

// Rejestracja widgetu w systemie szablonów
function registerWidget(registerFunction) {
  // Definicja prostego widgetu
  const SimpleWidget = ({ data = [], onSelect }) => {
    // Renderowanie listy elementów
    return React.createElement('div', {
      className: 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }, 
      data.map(item => {
        return React.createElement('div', {
          key: item.id,
          className: 'bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow',
          onClick: () => onSelect && onSelect(item.id)
        }, [
          // Ikona
          React.createElement('div', {
            key: 'icon',
            className: 'w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3'
          }, item.icon || '★'),
          
          // Tytuł
          React.createElement('h3', {
            key: 'title',
            className: 'font-semibold text-lg mb-1'
          }, item.name),
          
          // Opis
          React.createElement('p', {
            key: 'description',
            className: 'text-gray-600 text-sm'
          }, item.description || ''),
          
          // Licznik (jeśli dostępny)
          item.count !== undefined ? React.createElement('div', {
            key: 'count',
            className: 'mt-2 pt-2 border-t border-gray-100 text-sm text-gray-500'
          }, `${item.count} ${item.countLabel || 'items'}`) : null
        ].filter(Boolean))
      })
    );
  };
  
  // Rejestracja w systemie
  registerFunction({
    id: 'simple-widget',
    name: 'Simple Widget',
    category: 'scenario',
    component: SimpleWidget
  });
}

// Rejestracja przy ładowaniu
registerWidget((widget) => {
  // Ta funkcja zostanie zastąpiona przez rzeczywistą funkcję registerWidget z systemu
  if (typeof registerWidget === 'function') {
    registerWidget(widget);
  } else {
    console.warn('Widget registration function not available');
  }
});

module.exports = {
  register: registerWidget
};
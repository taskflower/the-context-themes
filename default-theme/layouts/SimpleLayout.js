// layouts/SimpleLayout.js
const React = require('react');

// Rejestracja layoutu w systemie szablonów
function registerLayout(registerFunction) {
  // Definicja prostego layoutu
  const SimpleLayout = ({ children }) => {
    return React.createElement('div', {
      className: 'min-h-screen bg-gray-50 flex flex-col p-4'
    }, [
      // Nagłówek
      React.createElement('header', {
        key: 'header',
        className: 'mb-8 py-4 border-b border-gray-200'
      }, [
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl font-bold text-gray-800'
        }, 'Minimal Template')
      ]),
      
      // Główna zawartość
      React.createElement('main', {
        key: 'main',
        className: 'flex-1'
      }, children),
      
      // Stopka
      React.createElement('footer', {
        key: 'footer',
        className: 'mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm'
      }, 'Created with Minimal Template')
    ]);
  };
  
  // Rejestracja w systemie
  registerFunction({
    id: 'simple-layout',
    name: 'Simple Layout',
    component: SimpleLayout
  });
}

// Rejestracja przy ładowaniu
registerLayout((layout) => {
  // Ta funkcja zostanie zastąpiona przez rzeczywistą funkcję registerLayout z systemu
  if (typeof registerLayout === 'function') {
    registerLayout(layout);
  } else {
    console.warn('Layout registration function not available');
  }
});

module.exports = {
  register: registerLayout
};
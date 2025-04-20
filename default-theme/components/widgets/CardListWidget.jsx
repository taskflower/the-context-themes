import React from 'react';

const CardListWidget = ({ data = [], onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect && onSelect(item.id)}
          className="bg-white border border-gray-200 p-4 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="mb-2">
            {item.icon && (
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                {item.icon}
              </div>
            )}
            <h2 className="font-semibold">{item.name}</h2>
          </div>

          {item.description && (
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          )}

          {item.count !== undefined && (
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {item.count} {item.countLabel || "elementy"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardListWidget;
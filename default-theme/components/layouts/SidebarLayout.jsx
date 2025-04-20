import React from 'react';

const SidebarLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Flow Builder</h1>
        </div>
        
        <nav className="mt-6">
          <ul>
            <li>
              <a href="/" className="block px-4 py-2 hover:bg-gray-700">
                Workspace
              </a>
            </li>
            <li>
              <a href="/themes" className="block px-4 py-2 hover:bg-gray-700">
                Motywy
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
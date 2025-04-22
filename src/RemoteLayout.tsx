import React from 'react';
import { LayoutProps } from 'your-app-types';
import { AppProvider } from './context';

// Layout opakowujący kroki i dostarczający kontekst
const RemoteLayout: React.FC<LayoutProps> = ({ children, title, onBackClick }) => (
  <AppProvider>
    <div style={{ border: '3px solid #646cff', padding: '1rem', borderRadius: '8px' }}>
      <header>
        <h1>{title || 'Minimalny Szablon'}</h1>
        {onBackClick && <button onClick={onBackClick}>Wróć</button>}
      </header>
      <main>{children}</main>
    </div>
  </AppProvider>
);

export default RemoteLayout;
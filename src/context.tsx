import React, { createContext, useState, useContext } from 'react';

// Typ danych w formularzu
export interface FormData {
  name: string;
}

// Interfejs kontekstu
interface AppContextProps {
  data: FormData;
  setData: (updates: Partial<FormData>) => void;
}

const AppContext = createContext<AppContextProps | null>(null);

// Provider kontekstu
export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [data, setDataState] = useState<FormData>({ name: '' });
  const setData = (updates: Partial<FormData>) =>
    setDataState(prev => ({ ...prev, ...updates }));

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook pomocniczy
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext musi być użyty wewnątrz AppProvider');
  return ctx;
};
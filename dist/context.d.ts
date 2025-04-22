import React from 'react';
export interface FormData {
    name: string;
}
interface AppContextProps {
    data: FormData;
    setData: (updates: Partial<FormData>) => void;
}
export declare const AppProvider: React.FC<React.PropsWithChildren<{}>>;
export declare const useAppContext: () => AppContextProps;
export {};

import React from 'react';

declare module 'your-app-types' {
  export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    onBackClick?: () => void;
  }

  export interface FlowStepProps {
    node: {
      label: string;
      assistantMessage: string;
    };
    onSubmit: (updates?: any) => void;
    onPrevious?: () => void;
    isLastNode?: boolean;
  }
}

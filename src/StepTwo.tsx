import React from 'react';
import { FlowStepProps } from 'your-app-types';
import { useAppContext } from './context';

const StepTwo: React.FC<FlowStepProps> = ({ onSubmit, onPrevious }) => {
  const { data } = useAppContext();

  return (
    <div>
      <p>Cześć, <strong>{data.name}</strong>!</p>
      <button onClick={onPrevious}>Wstecz</button>
      <button onClick={onSubmit}>Zakończ</button>
    </div>
  );
};

export default StepTwo;
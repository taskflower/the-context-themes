import React, { useState } from 'react';
import { FlowStepProps } from 'your-app-types';
import { useAppContext } from './context';

const StepOne: React.FC<FlowStepProps> = ({ onSubmit }) => {
  const { data, setData } = useAppContext();
  const [name, setName] = useState(data.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData({ name });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imię:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Dalej</button>
    </form>
  );
};

export default StepOne;
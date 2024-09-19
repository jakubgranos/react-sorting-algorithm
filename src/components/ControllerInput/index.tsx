import { FC } from 'react';

interface ControllerInputProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const ControllerInput: FC<ControllerInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="mt-1 block w-full pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  );
};

export default ControllerInput;

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isSorting: boolean;
  variant: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isSorting,
  variant,
}) => {
  const baseClasses = 'p-2 rounded transition-colors duration-300 text-white';
  const variantClasses =
    variant === 'primary'
      ? `${isSorting ? 'bg-gray-200' : 'bg-green-500'}`
      : `${isSorting ? 'bg-gray-200' : 'bg-blue-500'}`;

  return (
    <button
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      disabled={isSorting}
    >
      {children}
    </button>
  );
};

export default Button;

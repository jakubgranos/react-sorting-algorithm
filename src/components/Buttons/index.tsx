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
  const baseClasses = 'mt-4 p-2 rounded transition-colors duration-300';
  const variantClasses =
    variant === 'primary'
      ? `text-white ${isSorting ? 'bg-gray-200' : 'bg-green-500'}`
      : `text-black border border-black ${isSorting ? 'bg-gray-200' : ''}`;

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

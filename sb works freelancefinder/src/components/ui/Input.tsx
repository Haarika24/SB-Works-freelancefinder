import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const widthClass = fullWidth ? 'w-full' : '';
  
  const inputClasses = `
    px-4 py-2 
    border 
    rounded-md 
    shadow-sm 
    focus:outline-none 
    focus:ring-2 
    focus:ring-indigo-500 
    focus:border-indigo-500 
    ${error ? 'border-red-300' : 'border-gray-300'} 
    ${widthClass} 
    ${className}
  `;

  return (
    <div className={`${widthClass} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input id={inputId} className={inputClasses} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
import { FC, ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  variant?: 'default' | 'error' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  name?: string;
  className?: string;
  wrapperClassName?: string;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  variant = 'default',
  size = 'md',
  label,
  helperText,
  error,
  id,
  name,
  className = '',
  wrapperClassName = '',
  disabled = false,
  required = false,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isError = variant === 'error' || !!error;
  const isDisabled = variant === 'disabled' || disabled;

  // Base input classes
  const baseClasses = [
    'w-full border rounded-md font-medium',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'placeholder-gray-400'
  ];

  // Variant classes
  const variantClasses = {
    default: [
      'border-gray-300 bg-white text-gray-900',
      'focus:border-primary-500 focus:ring-primary-500',
      'hover:border-gray-400'
    ],
    error: [
      'border-red-300 bg-white text-gray-900',
      'focus:border-red-500 focus:ring-red-500',
      'hover:border-red-400'
    ],
    disabled: [
      'border-gray-200 bg-gray-50 text-gray-500',
      'cursor-not-allowed'
    ]
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  // Combine all classes
  const inputClasses = [
    ...baseClasses,
    ...variantClasses[isDisabled ? 'disabled' : isError ? 'error' : 'default'],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  // Helper/error text
  const messageText = error || helperText;
  const messageColor = isError ? 'text-red-600' : 'text-gray-500';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={isDisabled}
        required={required}
        className={inputClasses}
        aria-invalid={isError ? 'true' : 'false'}
        aria-describedby={messageText ? `${inputId}-description` : undefined}
        {...props}
      />
      
      {messageText && (
        <span
          id={`${inputId}-description`}
          className={`text-xs ${messageColor}`}
        >
          {messageText}
        </span>
      )}
    </div>
  );
};

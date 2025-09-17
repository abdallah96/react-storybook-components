import { FC, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  iconOnly?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  iconOnly = false,
}) => {
  // Base classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'border border-transparent'
  ];

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-600 text-white',
      'hover:bg-primary-700 hover:shadow-button-hover',
      'active:bg-primary-800',
      'shadow-button'
    ],
    secondary: [
      'bg-white text-gray-900 border-gray-300',
      'hover:bg-gray-50 hover:border-gray-400',
      'active:bg-gray-100',
      'shadow-button'
    ],
    ghost: [
      'bg-transparent text-gray-700',
      'hover:bg-gray-100 hover:text-gray-900',
      'active:bg-gray-200'
    ]
  };

  // Size classes
  const sizeClasses = {
    sm: iconOnly ? 'p-2' : 'px-3 py-1.5 text-sm',
    md: iconOnly ? 'p-2.5' : 'px-4 py-2 text-sm',
    lg: iconOnly ? 'p-3' : 'px-6 py-3 text-base'
  };

  // Disabled classes
  const disabledClasses = disabled ? ['opacity-60', 'cursor-not-allowed'] : [];

  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    ...disabledClasses,
    iconOnly ? 'rounded-full' : '',
    className
  ].filter(Boolean).join(' ');

  // Determine accessibility props
  const accessibilityProps = iconOnly && !ariaLabel && typeof children === 'string'
    ? { 'aria-label': children }
    : ariaLabel ? { 'aria-label': ariaLabel } : {};

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...accessibilityProps}
    >
      {children}
    </button>
  );
};

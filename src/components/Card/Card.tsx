import { FC, ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  description,
  footer,
  className = '',
  hoverable = false,
}) => {
  // Base card classes
  const baseClasses = [
    'bg-white rounded-lg border border-gray-200',
    'overflow-hidden transition-all duration-200',
    'w-full flex flex-col'
  ];

  // Hover effect
  const hoverClasses = hoverable ? [
    'hover:shadow-lg hover:border-gray-300',
    'hover:-translate-y-0.5'
  ] : [];

  // Combine all classes
  const cardClasses = [
    ...baseClasses,
    ...hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {/* Header section */}
      {(title || description) && (
        <div className="p-6 pb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Content section */}
      <div className={`px-6 ${!footer ? 'pb-6' : ''} ${!(title || description) ? 'pt-6' : ''}`}>
        {children}
      </div>
      
      {/* Footer section */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

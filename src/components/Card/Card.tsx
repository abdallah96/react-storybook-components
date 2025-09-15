import { FC, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  size = 'md',
  hoverable = false,
  className = '',
  onClick,
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[size],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      {...(onClick && { type: 'button' })}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </CardComponent>
  );
};

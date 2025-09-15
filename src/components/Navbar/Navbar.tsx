import { FC, useState, ReactNode } from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
  brand?: ReactNode;
  children?: ReactNode;
  variant?: 'default' | 'transparent' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fixed?: boolean;
  className?: string;
}

export interface NavbarItemProps {
  children: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface NavbarBrandProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const NavbarItem: FC<NavbarItemProps> = ({
  children,
  href,
  active = false,
  onClick,
  className = '',
}) => {
  const itemClasses = [styles.item, active ? styles.active : '', className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={itemClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={itemClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export const NavbarBrand: FC<NavbarBrandProps> = ({
  children,
  href,
  onClick,
  className = '',
}) => {
  const brandClasses = [styles.brand, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={brandClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={brandClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export const Navbar: FC<NavbarProps> = ({
  brand,
  children,
  variant = 'default',
  size = 'md',
  fixed = false,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navbarClasses = [
    styles.navbar,
    styles[variant],
    styles[size],
    fixed ? styles.fixed : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={navbarClasses}>
      <div className={styles.container}>
        <div className={styles.brandContainer}>{brand}</div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <div
          className={`${styles.menu} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

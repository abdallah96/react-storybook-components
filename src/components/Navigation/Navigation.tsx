import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type NavLink = { label: string; href: string; ariaLabel?: string };
export type NavDropdownItem = { label: string; href: string; description?: string; icon?: ReactNode; ariaLabel?: string };
export type NavDropdown = { label: string; items: NavDropdownItem[]; ariaLabel?: string; columns?: number };
export type NavItem = NavLink | NavDropdown;

function isDropdown(item: NavItem): item is NavDropdown { return (item as NavDropdown).items !== undefined; }

export interface NavigationProps {
  logo?: ReactNode;
  items: NavItem[];
  cta?: { label: string; href?: string; onClick?: () => void; ariaLabel?: string };
  showDarkModeToggle?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  className?: string;
}

const DropdownContent: FC<{ dd: NavDropdown; gridClass: string; direction: 'left' | 'right' | null }> = ({ dd, gridClass, direction }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShow(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  const startShift = direction === null ? 'translate-y-1' : direction === 'right' ? 'translate-x-4' : '-translate-x-4';
  return (
    <div className={`p-2 transform transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${startShift}`} ${gridClass}`}>
      {dd.items.map((sub) => (
        <a
          key={sub.label}
          href={sub.href}
          role="menuitem"
          className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 focus:outline-none"
          aria-label={sub.ariaLabel || sub.label}
        >
          {sub.icon && <span className="mt-0.5 text-gray-600 dark:text-gray-300">{sub.icon}</span>}
          <span>
            <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">{sub.label}</span>
            {sub.description && (
              <span className="mt-0.5 block text-xs text-gray-600 dark:text-gray-400">{sub.description}</span>
            )}
          </span>
        </a>
      ))}
    </div>
  );
};

export const Navigation: FC<NavigationProps> = ({
  logo,
  items,
  cta,
  showDarkModeToggle,
  isDarkMode,
  onToggleDarkMode,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClasses = useMemo(
    () => [
      'sticky top-0 z-50',
      'transition-colors duration-200 backdrop-blur supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:dark:bg-gray-900/70',
      isScrolled ? 'border-b border-gray-200 dark:border-gray-800' : 'bg-transparent',
      className,
    ].filter(Boolean).join(' '),
    [isScrolled, className]
  );

  const linkBase = 'relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md';
  const linkUnderline = 'after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-200 hover:after:w-3/4 focus:after:w-3/4';

  const hoverTimeout = useRef<number | null>(null);
  const lastIndexRef = useRef<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const openDropdown = useCallback((i: number) => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    if (lastIndexRef.current !== null) {
      setTransitionDirection(i > lastIndexRef.current ? 'right' : 'left');
    } else {
      setTransitionDirection(null);
    }
    lastIndexRef.current = i;
    setOpenDropdownIndex(i);
  }, []);
  const closeDropdown = useCallback(() => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = window.setTimeout(() => setOpenDropdownIndex(null), 120);
  }, []);

  const onTopKey = useCallback((e: React.KeyboardEvent, index: number, item: NavItem) => {
    if (e.key === 'Escape') { closeDropdown(); (e.currentTarget as HTMLElement).blur(); }
    if (isDropdown(item)) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown(index);
        dropdownRefs.current[index]?.querySelector<HTMLElement>('a, button')?.focus();
      }
    }
  }, [closeDropdown, openDropdown]);

  return (
    <header className={headerClasses} role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">{logo}</div>

          <div className="relative hidden md:block" onMouseLeave={closeDropdown}>
            <nav className="flex items-center gap-2" aria-label="Primary">
              {items.map((item, index) => {
                if (!isDropdown(item)) {
                  const link = item as NavLink;
                  return (
                    <a key={link.label} href={link.href} className={`${linkBase} ${linkUnderline}`} aria-label={link.ariaLabel || link.label}>{link.label}</a>
                  );
                }
                const dropdown = item as NavDropdown;
                const isOpen = openDropdownIndex === index;
                return (
                  <div key={dropdown.label} className="inline-block">
                    <button
                      type="button"
                      className={`${linkBase} ${linkUnderline} flex items-center gap-1`}
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={`nav-shared-menu`}
                      onMouseEnter={() => openDropdown(index)}
                      onFocus={() => openDropdown(index)}
                      onKeyDown={(e) => onTopKey(e, index, dropdown)}
                    >
                      {dropdown.label}
                      <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                );
              })}
            </nav>

            {(() => {
              if (openDropdownIndex === null) return null;
              const activeIndex = openDropdownIndex;
              const current = items[activeIndex];
              if (!isDropdown(current)) return null;
              const dd = current as NavDropdown;
              const cols = Math.max(1, Math.min(5, dd.columns ?? (dd.items.length > 6 ? 2 : 1)));
              const gridClass =
                cols === 1 ? '' :
                cols === 2 ? 'grid grid-cols-2 gap-2 sm:gap-3' :
                cols === 3 ? 'grid grid-cols-3 gap-2 sm:gap-3' :
                cols === 4 ? 'grid grid-cols-4 gap-2 sm:gap-3' :
                'grid grid-cols-5 gap-2 sm:gap-3';
              const maxWClass = cols >= 5 ? 'max-w-[72rem]' : cols === 4 ? 'max-w-[60rem]' : 'max-w-[48rem]';
              return (
                <div
                  id="nav-shared-menu"
                  ref={(el) => (dropdownRefs.current[activeIndex] = el)}
                  role="menu"
                  aria-label={`${dd.label} menu`}
                  onMouseEnter={() => openDropdown(activeIndex)}
                  className={`absolute left-0 mt-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl transition-all ease-in-out duration-300 origin-top opacity-100 scale-100 translate-y-0 min-w-[22rem] w-max ${maxWClass}`}
                >
                  <DropdownContent key={activeIndex} dd={dd} gridClass={gridClass} direction={transitionDirection} />
                </div>
              );
            })()}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {showDarkModeToggle && (
              <button type="button" aria-label="Toggle dark mode" onClick={onToggleDarkMode} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                {isDarkMode ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M17.293 13.293A8 8 0 016.707 2.707 8.001 8.001 0 1017.293 13.293z" /></svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-9 0a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm13 1a1 1 0 100-2h-1a1 1 0 100 2h1zM5.05 16.95a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM16.95 5.05a1 1 0 00-1.414 0l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 000-1.414zM17 11a1 1 0 011-1v0a1 1 0 110 2v0a1 1 0 01-1-1zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>
                )}
              </button>
            )}
            {cta && (cta.href ? (<a href={cta.href} aria-label={cta.ariaLabel || cta.label} className="inline-block px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition">{cta.label}</a>) : (<button onClick={cta.onClick} aria-label={cta.ariaLabel || cta.label} className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition">{cta.label}</button>))}
            <button type="button" className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className={`md:hidden fixed inset-y-0 right-0 z-[60] w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">{logo}</div>
          <button type="button" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {items.map((item) => {
            if (!isDropdown(item)) { const link = item as NavLink; return (<a key={link.label} href={link.href} className="block rounded-md px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">{link.label}</a>); }
            const dropdown = item as NavDropdown;
            return (
              <div key={dropdown.label} className="pt-2">
                <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{dropdown.label}</div>
                <div className="space-y-1">
                  {dropdown.items.map((sub) => (<a key={sub.label} href={sub.href} className="block rounded-md px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">{sub.label}</a>))}
                </div>
              </div>
            );
          })}
          {cta && (<div className="pt-3">{cta.href ? (<a href={cta.href} className="block"><button className="w-full px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition">{cta.label}</button></a>) : (<button className="w-full px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition" onClick={cta.onClick}>{cta.label}</button>)}</div>)}
        </div>
      </div>
    </header>
  );
};



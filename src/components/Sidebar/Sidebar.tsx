import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type SidebarLink = {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
  active?: boolean;
  ariaLabel?: string;
};

export type SidebarGroup = {
  label: string;
  icon?: ReactNode;
  items: SidebarLink[];
  ariaLabel?: string;
};

export type SidebarItem = SidebarLink | SidebarGroup;

function isGroup(item: SidebarItem): item is SidebarGroup {
  return (item as SidebarGroup).items !== undefined;
}

export interface SidebarProps {
  logo?: ReactNode;
  items: SidebarItem[];
  footer?: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  initialMobileOpen?: boolean;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({
  logo,
  items,
  footer,
  collapsible = true,
  defaultCollapsed = false,
  initialMobileOpen = false,
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(initialMobileOpen);
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const asideWidth = collapsed ? 'w-16' : 'w-64';

  const baseAsideClasses = useMemo(
    () =>
      [
        'h-screen sticky top-0 z-40 border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80',
        'backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-950/60',
        'hidden md:flex flex-col',
        asideWidth,
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [asideWidth, className]
  );

  const linkClasses = (active?: boolean) =>
    [
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm',
      active
        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    ].join(' ');

  const labelVisibility = collapsed ? 'opacity-0 pointer-events-none select-none w-0' : 'opacity-100';

  const toggleGroup = useCallback((index: number) => {
    setOpenGroups((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const closeMobileOnEsc = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Escape') setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.addEventListener('keydown', closeMobileOnEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeMobileOnEsc);
      document.body.style.overflow = '';
    };
  }, [mobileOpen, closeMobileOnEsc]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={baseAsideClasses} aria-label="Sidebar navigation">
        <div className="flex h-16 items-center justify-between px-3">
          <div className="flex items-center gap-2">
            {logo}
            <span className={`text-sm font-semibold text-gray-900 dark:text-gray-100 transition-all ${labelVisibility}`}>{/* reserved for brand text if provided outside */}</span>
          </div>
          {collapsible && (
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.79 5.23a.75.75 0 10-1.06 1.06L13.44 8H6a.75.75 0 000 1.5h7.44l-1.71 1.71a.75.75 0 101.06 1.06l3-3a.75.75 0 000-1.06l-3-3z"/></svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.21 14.77a.75.75 0 101.06-1.06L6.56 12H14a.75.75 0 000-1.5H6.56l1.71-1.71a.75.75 0 10-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3z"/></svg>
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2" aria-label="Sidebar items">
          <ul className="space-y-1">
            {items.map((item, index) => {
              if (!isGroup(item)) {
                const link = item as SidebarLink;
                return (
                  <li key={link.label}>
                    <a href={link.href} className={linkClasses(link.active)} aria-label={link.ariaLabel || link.label}>
                      {link.icon && <span className="text-gray-600 dark:text-gray-400">{link.icon}</span>}
                      <span className={`transition-all truncate ${labelVisibility}`}>{link.label}</span>
                      {link.badge && (
                        <span className={`ml-auto rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[10px] text-gray-700 dark:text-gray-300 ${collapsed ? 'hidden' : ''}`}>{link.badge}</span>
                      )}
                    </a>
                  </li>
                );
              }

              const group = item as SidebarGroup;
              const open = !!openGroups[index] && !collapsed;
              return (
                <li key={group.label}>
                  <button
                    type="button"
                    className={`${linkClasses()} w-full`}
                    aria-haspopup="true"
                    aria-expanded={open}
                    aria-controls={`group-${index}`}
                    onClick={() => toggleGroup(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleGroup(index);
                      }
                    }}
                  >
                    {group.icon && <span className="text-gray-600 dark:text-gray-400">{group.icon}</span>}
                    <span className={`transition-all truncate ${labelVisibility}`}>{group.label}</span>
                    <svg className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''} ${collapsed ? 'hidden' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div id={`group-${index}`} className={`${open ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''}`}>
                    <ul className="mt-1 space-y-1 pl-8">
                      {group.items.map((sub) => (
                        <li key={sub.label}>
                          <a href={sub.href} className={linkClasses(sub.active)} aria-label={sub.ariaLabel || sub.label}>
                            {sub.icon && <span className="text-gray-600 dark:text-gray-400">{sub.icon}</span>}
                            <span className="truncate">{sub.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {footer && (
          <div className={`border-t border-gray-200 dark:border-gray-800 p-3 ${collapsed ? 'px-2' : ''}`}>
            <div className={`${collapsed ? 'hidden' : ''}`}>{footer}</div>
          </div>
        )}
      </aside>

      {/* Mobile Drawer */}
      <div ref={containerRef} className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? '' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile sidebar"
          className={`absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-3 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">{logo}</div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-3" aria-label="Mobile sidebar items">
            <ul className="space-y-1">
              {items.map((item, index) => {
                if (!isGroup(item)) {
                  const link = item as SidebarLink;
                  return (
                    <li key={link.label}>
                      <a href={link.href} className={linkClasses(link.active)} aria-label={link.ariaLabel || link.label}>
                        {link.icon && <span className="text-gray-600 dark:text-gray-400">{link.icon}</span>}
                        <span className="truncate">{link.label}</span>
                      </a>
                    </li>
                  );
                }
                const group = item as SidebarGroup;
                return (
                  <li key={group.label}>
                    <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{group.label}</div>
                    <ul className="space-y-1">
                      {group.items.map((sub) => (
                        <li key={sub.label}>
                          <a href={sub.href} className={linkClasses(sub.active)}>
                            {sub.icon && <span className="text-gray-600 dark:text-gray-400">{sub.icon}</span>}
                            <span className="truncate">{sub.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
          {footer && <div className="border-t border-gray-200 dark:border-gray-800 p-3">{footer}</div>}
        </aside>
      </div>

      {/* Mobile toggle helper for consumers (optional): attach to a button externally */}
      {/* Consumers can control mobileOpen via CSS selectors or compose a wrapper. */}
    </>
  );
};



import { FC, ReactNode, useState, KeyboardEvent } from 'react';

export interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: number;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultActiveTab = 0,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setActiveTab(index);
        break;
      case 'Home':
        event.preventDefault();
        setActiveTab(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveTab(tabs.length - 1);
        break;
    }
  };

  if (tabs.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab List */}
      <div 
        role="tablist" 
        aria-orientation="horizontal"
        className="flex border-b border-gray-200"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              px-4 py-3 text-sm font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              relative
              ${activeTab === index 
                ? 'text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
            {/* Active tab indicator */}
            {activeTab === index && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
            className="focus:outline-none"
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

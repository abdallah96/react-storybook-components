import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  {
    label: 'Overview',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Overview</h3>
        <p className="text-gray-600">
          This is the overview tab content. It provides a general summary of the information.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            Summary information goes here. This could be statistics, key metrics, or important notes.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: 'Settings',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-gray-600">
          Configure your preferences and settings in this tab.
        </p>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
            <span className="ml-2 text-sm text-gray-700">Enable notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
            <span className="ml-2 text-sm text-gray-700">Dark mode</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    label: 'Advanced',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Options</h3>
        <p className="text-gray-600">
          Advanced configuration options for power users.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ Warning: These settings are for advanced users only. 
            Changes here may affect system stability.
          </p>
        </div>
      </div>
    ),
  },
];

const profileTabs = [
  {
    label: 'Profile',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="Doe"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Security',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Security Settings</h3>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Change Password
        </button>
      </div>
    ),
  },
  {
    label: 'Preferences',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">User Preferences</h3>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    ),
  },
];

export const Basic: Story = {
  args: {
    tabs: basicTabs,
  },
};

export const Profile: Story = {
  args: {
    tabs: profileTabs,
  },
};

export const WithDefaultActive: Story = {
  args: {
    tabs: basicTabs,
    defaultActiveTab: 1,
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      {
        label: 'First',
        content: (
          <div>
            <h3 className="text-lg font-medium mb-2">First Tab</h3>
            <p className="text-gray-600">Simple content for the first tab.</p>
          </div>
        ),
      },
      {
        label: 'Second',
        content: (
          <div>
            <h3 className="text-lg font-medium mb-2">Second Tab</h3>
            <p className="text-gray-600">Content for the second tab.</p>
          </div>
        ),
      },
    ],
  },
};

const InteractiveTabsExample = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  
  const tabs = [
    {
      label: 'Tab 1',
      content: `Active tab: ${activeTab + 1}`,
    },
    {
      label: 'Tab 2', 
      content: `Active tab: ${activeTab + 1}`,
    },
    {
      label: 'Tab 3',
      content: `Active tab: ${activeTab + 1}`,
    },
  ];

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} defaultActiveTab={activeTab} />
      <div className="text-sm text-gray-500">
        Current active tab index: {activeTab}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTabsExample />,
};

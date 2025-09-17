import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, type SidebarItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items: SidebarItem[] = [
  { label: 'Overview', href: '#', active: true },
  {
    label: 'Projects',
    items: [
      { label: 'All Projects', href: '#' },
      { label: 'Create Project', href: '#', badge: 'New' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Traffic', href: '#' },
      { label: 'Performance', href: '#' },
    ],
  },
  { label: 'Team', href: '#' },
  { label: 'Settings', href: '#' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-6 w-6 rounded bg-primary-600" aria-hidden="true" />
    <span className="text-sm font-semibold">Brand</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="flex">
      <Sidebar logo={<Logo />} items={items} footer={<div className="text-xs text-gray-500">v1.0.0</div>} />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-2">Content Area</h1>
        <p className="text-gray-600">Resize the window to see mobile behavior.</p>
      </main>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="flex">
      <Sidebar logo={<Logo />} items={items} defaultCollapsed />
      <main className="flex-1 p-6" />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'iphonex' } },
  render: () => (
    <div className="flex">
      <Sidebar logo={<Logo />} items={items} initialMobileOpen />
      <main className="flex-1 p-6" />
    </div>
  ),
};



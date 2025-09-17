import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation, type NavItem } from './Navigation';
import { Button } from '../Button/Button';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items: NavItem[] = [
  { label: 'Home', href: '#' },
  {
    label: 'Examples',
    columns: 3,
    items: [
      { label: 'Templates', href: '#', description: 'Starter templates' },
      { label: 'Boilerplates', href: '#', description: 'Preconfigured setups' },
      { label: 'Showcase', href: '#', description: 'Featured projects' },
      { label: 'Integrations', href: '#', description: 'Ecosystem integrations' },
      { label: 'Starters', href: '#', description: 'Quick start kits' },
      { label: 'Guides', href: '#', description: 'Step-by-step tutorials' },
      { label: 'Playgrounds', href: '#', description: 'Try features live' },
      { label: 'Examples Repo', href: '#', description: 'Community examples' },
    ],
  },
  {
    label: 'Products',
    columns: 2,
    items: [
      { label: 'Hosting', href: '#', description: 'Global edge network' },
      { label: 'Analytics', href: '#', description: 'Actionable insights' },
      { label: 'Storage', href: '#', description: 'Durable object storage' },
      { label: 'KV', href: '#', description: 'Key-value storage' },
      { label: 'Queues', href: '#', description: 'Background jobs' },
    ],
  },
  {
    label: 'Pricing',
    items: [
      { label: 'Hobby', href: '#', description: 'Free tier for personal projects' },
      { label: 'Pro', href: '#', description: 'Advanced features for teams' },
      { label: 'Enterprise', href: '#', description: 'Security and scale' },
    ],
  },
  { label: 'Docs', href: '#' },
];

const extendedLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const CustomLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">C</span>
    </div>
    <span className="text-xl font-bold text-gray-900">Company</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <Navigation
      logo={<div className="h-6 w-6 rounded bg-primary-600" aria-label="Logo" />}
      items={items}
      cta={{ label: 'Sign Up', href: '#' }}
      showDarkModeToggle
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'iphonex' }, layout: 'fullscreen' },
  render: () => (
    <Navigation
      logo={<div className="h-6 w-6 rounded bg-primary-600" aria-label="Logo" />}
      items={items}
      cta={{ label: 'Sign Up', href: '#' }}
      showDarkModeToggle
    />
  ),
};

export const ExamplePage: Story = {
  render: () => (
    <div className="min-h-screen">
      <Navigation
        logo={<div className="h-6 w-6 rounded bg-primary-600" aria-label="Logo" />}
        items={items}
        cta={{ label: 'Get Started', href: '#' }}
        showDarkModeToggle
      />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Landing Content</h1>
        <p className="text-gray-600">Scroll to see the sticky header change state.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
        ))}
      </main>
    </div>
  ),
};

export const WithUserAvatar: Story = {
  render: () => (
    <Navigation
      logo={<CustomLogo />}
      items={items}
      cta={{ label: 'Get Started', href: '#' }}
      showDarkModeToggle
    />
  ),
};

export const Dark: Story = {
  render: () => (
    <div className="dark bg-gray-950 min-h-[200px]">
      <Navigation
        logo={<div className="h-6 w-6 rounded bg-primary-400" aria-label="Logo" />}
        items={items}
        cta={{ label: 'Get Started', href: '#' }}
        showDarkModeToggle
        isDarkMode
      />
    </div>
  ),
};

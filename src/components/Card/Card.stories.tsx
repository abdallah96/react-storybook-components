import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: 'This is a simple card with some basic content.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title and some content below it.',
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Featured Product',
    description: 'A brief description of what this card is about',
    children: (
      <div className="space-y-3">
        <p className="text-gray-600">
          This is the main content area of the card. You can put any React components here.
        </p>
        <div className="flex gap-2">
          <Button size="sm">Learn More</Button>
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Project Card',
    description: 'Ongoing development project',
    children: (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-primary-600">75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full" 
            style={{ width: '75%' }}
          />
        </div>
        <p className="text-sm text-gray-600 pt-2">
          Project is on track for completion next month.
        </p>
      </div>
    ),
    footer: (
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Last updated: Today</span>
        <Button size="sm" variant="ghost">
          View Project
        </Button>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    title: 'Hover Effect',
    description: 'This card has a hover effect',
    children: 'Hover over this card to see the subtle animation.',
    hoverable: true,
  },
};

export const ComplexExample: Story = {
  args: {
    title: 'User Profile',
    description: 'Software Developer',
    children: (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold">JD</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">John Doe</h4>
            <p className="text-sm text-gray-500">San Francisco, CA</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Projects</span>
            <p className="font-medium">12</p>
          </div>
          <div>
            <span className="text-gray-500">Followers</span>
            <p className="font-medium">1.2K</p>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          Follow
        </Button>
        <Button variant="secondary" size="sm" className="flex-1">
          Message
        </Button>
      </div>
    ),
    hoverable: true,
  },
};

export const AllExamples: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card title="Simple Card">
        <p className="text-gray-600">Basic card with just content.</p>
      </Card>
      
      <Card 
        title="Card with Footer" 
        description="This has a footer section"
        footer={
          <div className="flex justify-end">
            <Button size="sm">Action</Button>
          </div>
        }
      >
        <p className="text-gray-600">Main content area with footer actions.</p>
      </Card>
      
      <Card 
        title="Hoverable Card"
        hoverable={true}
      >
        <p className="text-gray-600">Hover over this card to see the effect.</p>
      </Card>
      
      <Card
        title="Statistics"
        description="Monthly performance"
        footer={
          <div className="text-sm text-gray-500">
            Updated: {new Date().toLocaleDateString()}
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span className="font-medium text-green-600">92%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Active Users</span>
            <span className="font-medium text-blue-600">1,243</span>
          </div>
        </div>
      </Card>
    </div>
  ),
};

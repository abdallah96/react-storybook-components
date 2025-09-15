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
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    hoverable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a simple card with some content.',
    size: 'md',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title and some content.',
    size: 'md',
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle',
    children: 'This card has both a title and subtitle.',
    size: 'md',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    children: 'This card has an outlined style.',
    variant: 'outlined',
    size: 'md',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    children: 'This card has an elevated style with more shadow.',
    variant: 'elevated',
    size: 'md',
  },
};

export const Hoverable: Story = {
  args: {
    title: 'Hoverable Card',
    children: 'Hover over this card to see the effect.',
    hoverable: true,
    size: 'md',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click anywhere on this card',
    children: 'This entire card is clickable and acts as a button.',
    onClick: () => alert('Card clicked!'),
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Card',
    children: 'This is a small card.',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Card',
    children: 'This is a large card with more padding.',
    size: 'lg',
  },
};

export const WithButtons: Story = {
  args: {
    title: 'Card with Actions',
    children: 'This card contains some action buttons.',
    size: 'md',
  },
  render: args => (
    <Card {...args}>
      <p>This card contains some action buttons.</p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Button size="sm">Action 1</Button>
        <Button variant="secondary" size="sm">
          Action 2
        </Button>
      </div>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        maxWidth: '800px',
      }}
    >
      <Card title="Default" variant="default">
        Default card style
      </Card>
      <Card title="Outlined" variant="outlined">
        Outlined card style
      </Card>
      <Card title="Elevated" variant="elevated">
        Elevated card style
      </Card>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Card title="Small" size="sm">
        Small card
      </Card>
      <Card title="Medium" size="md">
        Medium card
      </Card>
      <Card title="Large" size="lg">
        Large card
      </Card>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card title="Product Card" subtitle="Premium Quality" hoverable>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <img
          src="https://via.placeholder.com/300x200/4f46e5/ffffff?text=Product+Image"
          alt="Product"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
        <div>
          <h4
            style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}
          >
            Amazing Product
          </h4>
          <p
            style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }}
          >
            This is a description of the amazing product that you can buy.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}
            >
              $99.99
            </span>
            <Button size="sm">Add to Cart</Button>
          </div>
        </div>
      </div>
    </Card>
  ),
};

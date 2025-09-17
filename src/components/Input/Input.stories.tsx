import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'disabled'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    variant: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    size: 'md',
    variant: 'default',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be at least 3 characters long',
    size: 'md',
    variant: 'default',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
    size: 'md',
    variant: 'default',
  },
};

// Error state
export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    size: 'md',
    variant: 'error',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    size: 'md',
    variant: 'disabled',
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
    variant: 'default',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
    variant: 'default',
  },
};

// Controlled input example
const ControlledStory = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '300px' }}>
      <Input
        label="Controlled Input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type something..."
        helperText="This input is controlled by React state"
      />
      <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
        Value: {value}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledStory,
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input label="Small" size="sm" placeholder="Small input" variant="default" />
      <Input label="Medium" size="md" placeholder="Medium input" variant="default" />
      <Input label="Large" size="lg" placeholder="Large input" variant="default" />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '300px',
      }}
    >
      <Input
        label="Default Input"
        placeholder="Default variant"
        variant="default"
        helperText="This is helper text"
      />
      
      <Input
        label="Error Input"
        placeholder="Error variant"
        variant="error"
        error="This field is required"
      />
      
      <Input
        label="Disabled Input"
        placeholder="Disabled variant"
        variant="disabled"
        helperText="This input is disabled"
      />
    </div>
  ),
};

// Search input example
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    size: 'md',
    variant: 'default',
  },
};

// Email input with validation example
export const EmailValidation: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    helperText: 'We\'ll never share your email with anyone else.',
    size: 'md',
    variant: 'default',
  },
};

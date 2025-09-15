import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, NavbarBrand, NavbarItem } from './Navbar';
import { Button } from '../Button/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fixed: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Navbar brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
    </Navbar>
  ),
};

export const WithActiveItem: Story = {
  render: () => (
    <Navbar brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about" active>
        About
      </NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
    </Navbar>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Navbar brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
        <Button size="sm" variant="secondary">
          Login
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
    </Navbar>
  ),
};

export const Transparent: Story = {
  render: () => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '200px',
        padding: '20px',
      }}
    >
      <Navbar
        variant="transparent"
        brand={<NavbarBrand style={{ color: 'white' }}>MyApp</NavbarBrand>}
      >
        <NavbarItem href="#home" style={{ color: 'white' }}>
          Home
        </NavbarItem>
        <NavbarItem href="#about" style={{ color: 'white' }}>
          About
        </NavbarItem>
        <NavbarItem href="#services" style={{ color: 'white' }}>
          Services
        </NavbarItem>
        <NavbarItem href="#contact" style={{ color: 'white' }}>
          Contact
        </NavbarItem>
      </Navbar>
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <Navbar variant="dark" brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
    </Navbar>
  ),
};

export const Small: Story = {
  render: () => (
    <Navbar size="sm" brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
    </Navbar>
  ),
};

export const Large: Story = {
  render: () => (
    <Navbar size="lg" brand={<NavbarBrand>MyApp</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
    </Navbar>
  ),
};

export const Fixed: Story = {
  render: () => (
    <div>
      <Navbar fixed brand={<NavbarBrand>Fixed Navbar</NavbarBrand>}>
        <NavbarItem href="#home">Home</NavbarItem>
        <NavbarItem href="#about">About</NavbarItem>
        <NavbarItem href="#services">Services</NavbarItem>
        <NavbarItem href="#contact">Contact</NavbarItem>
      </Navbar>
      <div style={{ padding: '100px 20px', background: '#f9fafb' }}>
        <h1>Content below fixed navbar</h1>
        <p>
          This content is below the fixed navbar. Scroll to see the navbar stays
          at the top.
        </p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <Navbar
      brand={
        <NavbarBrand
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#4f46e5',
              borderRadius: '4px',
            }}
          ></div>
          MyApp
        </NavbarBrand>
      }
    >
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#services">Services</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
    </Navbar>
  ),
};

export const Complex: Story = {
  render: () => (
    <Navbar size="lg" brand={<NavbarBrand>Complex App</NavbarBrand>}>
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#products">Products</NavbarItem>
      <NavbarItem href="#solutions">Solutions</NavbarItem>
      <NavbarItem href="#pricing">Pricing</NavbarItem>
      <NavbarItem href="#docs">Docs</NavbarItem>
      <div style={{ display: 'flex', gap: '12px', marginLeft: '24px' }}>
        <Button size="sm" variant="secondary">
          Login
        </Button>
        <Button size="sm">Get Started</Button>
      </div>
    </Navbar>
  ),
};

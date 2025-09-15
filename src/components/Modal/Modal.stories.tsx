import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithState = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the modal content. You can put anything here!</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithState title="Default Modal" />,
};

export const Small: Story = {
  render: () => <ModalWithState title="Small Modal" size="sm" />,
};

export const Medium: Story = {
  render: () => <ModalWithState title="Medium Modal" size="md" />,
};

export const Large: Story = {
  render: () => <ModalWithState title="Large Modal" size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalWithState title="Extra Large Modal" size="xl" />,
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWithState>
      <p>This modal has no title but still has a close button.</p>
    </ModalWithState>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalWithState title="No Close Button" showCloseButton={false}>
      <p>This modal cannot be closed with the X button.</p>
      <p>You can only close it by clicking the overlay or pressing Escape.</p>
    </ModalWithState>
  ),
};

export const NoOverlayClose: Story = {
  render: () => (
    <ModalWithState title="No Overlay Close" closeOnOverlayClick={false}>
      <p>This modal cannot be closed by clicking the overlay.</p>
      <p>You must use the close button or press Escape.</p>
    </ModalWithState>
  ),
};

export const NoEscapeClose: Story = {
  render: () => (
    <ModalWithState title="No Escape Close" closeOnEscape={false}>
      <p>This modal cannot be closed by pressing Escape.</p>
      <p>You must use the close button or click the overlay.</p>
    </ModalWithState>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWithState title="Modal with Long Content" size="lg">
      <p>This modal has a lot of content to demonstrate scrolling behavior.</p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>
          This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      ))}
    </ModalWithState>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalWithState title="Contact Form" size="md">
      <form>
        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="name-input"
            style={{ display: 'block', marginBottom: '4px' }}
          >
            Name
          </label>
          <input
            id="name-input"
            type="text"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="email-input"
            style={{ display: 'block', marginBottom: '4px' }}
          >
            Email
          </label>
          <input
            id="email-input"
            type="email"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="message-textarea"
            style={{ display: 'block', marginBottom: '4px' }}
          >
            Message
          </label>
          <textarea
            id="message-textarea"
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          />
        </div>
        <div
          style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
        >
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Send</Button>
        </div>
      </form>
    </ModalWithState>
  ),
};

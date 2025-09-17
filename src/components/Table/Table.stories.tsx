import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive', joinDate: '2023-05-12' },
];

const userColumns = [
  { name: 'ID', accessor: 'id', sortable: true },
  { name: 'Name', accessor: 'name', sortable: true },
  { name: 'Email', accessor: 'email', sortable: true },
  { name: 'Role', accessor: 'role', sortable: true },
  { name: 'Status', accessor: 'status', sortable: true },
  { name: 'Join Date', accessor: 'joinDate', sortable: true },
];

const productData = [
  { id: 'P001', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
  { id: 'P002', name: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 8 },
  { id: 'P003', name: 'Coffee Mug', category: 'Kitchen', price: 12.99, stock: 45 },
  { id: 'P004', name: 'Headphones', category: 'Electronics', price: 149.99, stock: 22 },
];

const productColumns = [
  { name: 'Product ID', accessor: 'id', sortable: true },
  { name: 'Name', accessor: 'name', sortable: true },
  { name: 'Category', accessor: 'category', sortable: true },
  { name: 'Price', accessor: 'price', sortable: true },
  { name: 'Stock', accessor: 'stock', sortable: true },
];

// Simple data with mixed sortable/non-sortable columns
const simpleData = [
  { name: 'Project A', progress: 75, deadline: '2023-12-01' },
  { name: 'Project B', progress: 30, deadline: '2023-11-15' },
  { name: 'Project C', progress: 90, deadline: '2023-12-20' },
];

const simpleColumns = [
  { name: 'Project Name', accessor: 'name', sortable: true },
  { name: 'Progress (%)', accessor: 'progress', sortable: true },
  { name: 'Deadline', accessor: 'deadline', sortable: false },
];

export const UsersTable: Story = {
  args: {
    columns: userColumns,
    data: userData,
  },
};

export const ProductsTable: Story = {
  args: {
    columns: productColumns,
    data: productData,
  },
};

export const MixedSortable: Story = {
  args: {
    columns: simpleColumns,
    data: simpleData,
  },
};

export const EmptyTable: Story = {
  args: {
    columns: userColumns,
    data: [],
  },
};

export const WithCustomClass: Story = {
  args: {
    columns: userColumns,
    data: userData,
    className: 'max-w-4xl',
  },
};

// Responsive example with many columns
const wideData = [
  { 
    id: 1, 
    firstName: 'John', 
    lastName: 'Doe', 
    department: 'Engineering', 
    position: 'Senior Developer',
    salary: 85000, 
    startDate: '2020-03-15',
    location: 'San Francisco',
    email: 'john.doe@company.com',
    phone: '+1-555-0123'
  },
  { 
    id: 2, 
    firstName: 'Jane', 
    lastName: 'Smith', 
    department: 'Marketing', 
    position: 'Marketing Manager',
    salary: 75000, 
    startDate: '2019-08-22',
    location: 'New York',
    email: 'jane.smith@company.com',
    phone: '+1-555-0124'
  },
];

const wideColumns = [
  { name: 'ID', accessor: 'id', sortable: true },
  { name: 'First Name', accessor: 'firstName', sortable: true },
  { name: 'Last Name', accessor: 'lastName', sortable: true },
  { name: 'Department', accessor: 'department', sortable: true },
  { name: 'Position', accessor: 'position', sortable: true },
  { name: 'Salary', accessor: 'salary', sortable: true },
  { name: 'Start Date', accessor: 'startDate', sortable: true },
  { name: 'Location', accessor: 'location', sortable: true },
  { name: 'Email', accessor: 'email', sortable: true },
  { name: 'Phone', accessor: 'phone', sortable: false },
];

export const WideTable: Story = {
  args: {
    columns: wideColumns,
    data: wideData,
    className: 'max-w-screen-lg',
  },
};

// Interactive example with state
const InteractiveTableExample = () => {
  const [data, setData] = React.useState(userData);
  
  const addUser = () => {
    const newUser = {
      id: data.length + 1,
      name: `New User ${data.length + 1}`,
      email: `user${data.length + 1}@example.com`,
      role: 'User',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setData([...data, newUser]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Management</h3>
        <button 
          onClick={addUser}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Add User
        </button>
      </div>
      <Table columns={userColumns} data={data} />
      <p className="text-sm text-gray-500">
        Total users: {data.length}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTableExample />,
};

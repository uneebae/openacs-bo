import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Edit,
  Power,
  Trash2,
  KeyRound,
  CheckCircle2,
  XCircle } from
'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Tabs } from '../components/common/Tabs';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ActionMenu } from '../components/common/ActionMenu';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Users, Inbox, User } from 'lucide-react';
const mockUsers = [
{
  id: 1,
  createdAt: '2024-01-15 10:30',
  username: 'janderson',
  name: 'John Anderson',
  nationalId: '123-45-6789',
  mobile: '+1-555-0101',
  email: 'john.anderson@chase.com',
  role: 'Administrator',
  institution: 'Chase Bank',
  status: 'active'
},
{
  id: 2,
  createdAt: '2024-01-14 14:20',
  username: 'schen',
  name: 'Sarah Chen',
  nationalId: '234-56-7890',
  mobile: '+1-555-0102',
  email: 'sarah.chen@wellsfargo.com',
  role: 'Transaction Maker',
  institution: 'Wells Fargo',
  status: 'active'
},
{
  id: 3,
  createdAt: '2024-01-12 09:15',
  username: 'uneebae',
  name: 'Uneeb Ahmed',
  nationalId: '345-67-8901',
  mobile: '+1-555-0103',
  email: 'uneeb.ahmed@bofa.com',
  role: 'Transaction Checker',
  institution: 'Bank of America',
  status: 'active'
},
{
  id: 4,
  createdAt: '2024-01-10 16:45',
  username: 'ewilliams',
  name: 'Emily Williams',
  nationalId: '456-78-9012',
  mobile: '+1-555-0104',
  email: 'emily.williams@citi.com',
  role: 'Read Only Viewer',
  institution: 'Citibank',
  status: 'inactive'
},
{
  id: 5,
  createdAt: '2024-01-08 11:00',
  username: 'rbrown',
  name: 'Robert Brown',
  nationalId: '567-89-0123',
  mobile: '+1-555-0105',
  email: 'robert.brown@chase.com',
  role: 'Audit Manager',
  institution: 'Chase Bank',
  status: 'active'
}];

const mockInbox = [
{
  id: 1,
  requestDate: '2024-01-16 09:30',
  processId: 'PU-2024-001',
  username: 'tdavis',
  name: 'Thomas Davis',
  createdBy: 'Uneeb Ahmed',
  operation: 'create',
  comments: 'New user for fraud detection team'
},
{
  id: 2,
  requestDate: '2024-01-15 14:20',
  processId: 'PU-2024-002',
  username: 'schen',
  name: 'Sarah Chen',
  modifiedBy: 'Uneeb Ahmed',
  operation: 'update',
  comments: 'Role change from Maker to Checker'
},
{
  id: 3,
  requestDate: '2024-01-14 11:45',
  processId: 'PU-2024-003',
  username: 'temp_user',
  name: 'Temporary User',
  createdBy: 'Uneeb Ahmed',
  operation: 'delete',
  comments: 'Removing temporary contractor account'
}];

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('listing');
  const [searchUsername, setSearchUsername] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchNationalId, setSearchNationalId] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    nationalId: '',
    mobile: '',
    email: '',
    role: '',
    institution: '',
    password: '',
    status: 'active'
  });
  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((n) => n[0]).
    join('').
    toUpperCase();
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({
      username: '',
      name: '',
      nationalId: '',
      mobile: '',
      email: '',
      role: '',
      institution: '',
      password: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    // Here you would typically send this to a backend API
    console.log('Saving user:', formData);
    setShowModal(false);
    // Reset form
    setFormData({
      username: '',
      name: '',
      nationalId: '',
      mobile: '',
      email: '',
      role: '',
      institution: '',
      password: '',
      status: 'active'
    });
  };
  const userColumns = [
  {
    key: 'createdAt',
    label: 'Created At',
    width: '160px'
  },
  {
    key: 'username',
    label: 'User Name',
    width: '180px',
    render: (username: string, row: any) =>
    <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-semibold">
            {getInitials(row.name)}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{username}</span>
        </div>

  },
  {
    key: 'name',
    label: 'Name',
    width: '180px'
  },
  {
    key: 'nationalId',
    label: 'National ID',
    width: '140px'
  },
  {
    key: 'mobile',
    label: 'Mobile',
    width: '140px'
  },
  {
    key: 'email',
    label: 'Email',
    width: '220px',
    render: (email: string) => <span className="text-gray-600 dark:text-gray-400">{email}</span>
  },
  {
    key: 'role',
    label: 'Role',
    width: '160px',
    render: (role: string) =>
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          {role}
        </span>

  },
  {
    key: 'institution',
    label: 'Institution',
    width: '160px'
  },
  {
    key: 'status',
    label: 'Status',
    width: '100px',
    render: (status: string) =>
    <StatusBadge status={status as 'active' | 'inactive'} />

  },
  {
    key: 'action',
    label: 'Action',
    width: '80px',
    render: (_: any, row: any) =>
    <ActionMenu
      actions={[
      {
        label: 'View Details',
        onClick: () => console.log('View', row),
        icon: <Eye className="h-4 w-4" />
      },
      {
        label: 'Edit User',
        onClick: () => console.log('Edit', row),
        icon: <Edit className="h-4 w-4" />
      },
      {
        label: 'Reset Password',
        onClick: () => console.log('Reset', row),
        icon: <KeyRound className="h-4 w-4" />
      },
      {
        label: row.status === 'active' ? 'Deactivate' : 'Activate',
        onClick: () => console.log('Toggle', row),
        icon: <Power className="h-4 w-4" />
      },
      {
        label: 'Delete',
        onClick: () => console.log('Delete', row),
        variant: 'danger',
        icon: <Trash2 className="h-4 w-4" />
      }]
      } />


  }];

  const inboxColumns = [
  {
    key: 'requestDate',
    label: 'Request Date',
    width: '180px'
  },
  {
    key: 'processId',
    label: 'Process ID',
    width: '140px'
  },
  {
    key: 'username',
    label: 'User Name',
    width: '140px'
  },
  {
    key: 'name',
    label: 'Name',
    width: '180px'
  },
  {
    key: 'createdBy',
    label: 'Created/Modified By',
    width: '180px',
    render: (_: any, row: any) => row.createdBy || row.modifiedBy
  },
  {
    key: 'operation',
    label: 'Operation',
    width: '120px',
    render: (operation: string) =>
    <StatusBadge status={operation as 'create' | 'update' | 'delete'} />

  },
  {
    key: 'comments',
    label: 'Comments',
    width: '280px'
  },
  {
    key: 'action',
    label: 'Action',
    width: '80px',
    render: (_: any, row: any) =>
    <ActionMenu
      actions={[
      {
        label: 'View Request',
        onClick: () => console.log('View', row),
        icon: <Eye className="h-4 w-4" />
      },
      {
        label: 'Approve',
        onClick: () => console.log('Approve', row),
        icon: <CheckCircle2 className="h-4 w-4" />
      },
      {
        label: 'Reject',
        onClick: () => console.log('Reject', row),
        variant: 'danger',
        icon: <XCircle className="h-4 w-4" />
      }]
      } />


  }];

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.3
      }}>
      
      <PageHeader
        title="User Management"
        breadcrumb="Home / Users"
        primaryAction={
        activeTab === 'listing' ?
        {
          label: 'Add User',
          onClick: handleAddUser
        } :
        undefined
        } />
      

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Tabs
          tabs={[
          {
            id: 'listing',
            label: 'All Users',
            count: mockUsers.length
          },
          {
            id: 'inbox',
            label: 'Maker Inbox',
            count: mockInbox.length
          }]
          }
          activeTab={activeTab}
          onChange={setActiveTab} />
        

        <div className="p-6">
          {activeTab === 'listing' &&
          <>
              <FilterBar
              fields={[
              {
                type: 'search',
                placeholder: 'Search by username...',
                value: searchUsername,
                onChange: setSearchUsername
              },
              {
                type: 'search',
                placeholder: 'Search by name...',
                value: searchName,
                onChange: setSearchName
              },
              {
                type: 'search',
                placeholder: 'Search by National ID...',
                value: searchNationalId,
                onChange: setSearchNationalId
              },
              {
                type: 'search',
                placeholder: 'Search by mobile...',
                value: searchMobile,
                onChange: setSearchMobile
              },
              {
                type: 'search',
                placeholder: 'Search by email...',
                value: searchEmail,
                onChange: setSearchEmail
              },
              {
                type: 'select',
                placeholder: 'All Roles',
                value: roleFilter,
                onChange: setRoleFilter,
                options: [
                {
                  value: 'admin',
                  label: 'Administrator'
                },
                {
                  value: 'maker',
                  label: 'Transaction Maker'
                },
                {
                  value: 'checker',
                  label: 'Transaction Checker'
                },
                {
                  value: 'viewer',
                  label: 'Read Only Viewer'
                }]

              }]
              } />
            

              <DataTable
              columns={userColumns}
              data={mockUsers}
              emptyState={
              <EmptyState
                icon={Users}
                title="No users found"
                description="Create your first user account to get started" />

              } />
            

              <Pagination
              currentPage={currentPage}
              totalPages={1}
              pageSize={pageSize}
              totalItems={mockUsers.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize} />
            
            </>
          }

          {activeTab === 'inbox' &&
          <>
              <DataTable
              columns={inboxColumns}
              data={mockInbox}
              emptyState={
              <EmptyState
                icon={Inbox}
                title="No pending approvals"
                description="All user requests have been processed" />

              } />
            

              <Pagination
              currentPage={currentPage}
              totalPages={1}
              pageSize={pageSize}
              totalItems={mockInbox.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize} />
            
            </>
          }
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showModal}
        title={selectedUser ? 'Edit User' : 'Add New User'}
        size="md"
        onClose={() => setShowModal(false)}
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Username"
            placeholder="john_doe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            leftIcon={<User size={18} />}
            required
          />

          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Mobile"
              type="tel"
              placeholder="+1-555-0000"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
            />
          </div>

          <Input
            label="National ID"
            placeholder="123-45-6789"
            value={formData.nationalId}
            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'administrator', label: 'Administrator' },
                { value: 'maker', label: 'Transaction Maker' },
                { value: 'checker', label: 'Transaction Checker' },
                { value: 'viewer', label: 'Viewer' },
                { value: 'audit', label: 'Audit Manager' }
              ]}
              required
            />
            <Select
              label="Institution"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              options={[
                { value: 'chase', label: 'Chase Bank' },
                { value: 'wellsfargo', label: 'Wells Fargo' },
                { value: 'bofa', label: 'Bank of America' },
                { value: 'citi', label: 'Citibank' }
              ]}
              required
            />
          </div>

          {!selectedUser && (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}
        </div>
      </Modal>
    </motion.div>);

}
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Power, Trash2, CheckCircle2, XCircle, Shield, Inbox } from 'lucide-react';
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
import { Textarea } from '../components/forms/Textarea';
import { Button } from '../components/forms/Button';
import { Switch } from '../components/forms/Switch';

interface Role {
  id: number;
  createdAt: string;
  code: string;
  name: string;
  institution: string;
  description: string;
  permissions: {
    userManagement: boolean;
    roleManagement: boolean;
    transactionView: boolean;
    transactionApprove: boolean;
    reportGeneration: boolean;
    systemConfig: boolean;
  };
  status: 'active' | 'inactive';
}

const mockRoles: Role[] = [
  {
    id: 1,
    createdAt: '2024-01-15 10:30',
    code: 'ADMIN',
    name: 'Administrator',
    institution: 'Chase Bank',
    description: 'Full system access with all permissions',
    permissions: {
      userManagement: true,
      roleManagement: true,
      transactionView: true,
      transactionApprove: true,
      reportGeneration: true,
      systemConfig: true
    },
    status: 'active'
  },
  {
    id: 2,
    createdAt: '2024-01-14 14:20',
    code: 'MAKER',
    name: 'Transaction Maker',
    institution: 'Wells Fargo',
    description: 'Can create and submit transactions',
    permissions: {
      userManagement: false,
      roleManagement: false,
      transactionView: true,
      transactionApprove: false,
      reportGeneration: true,
      systemConfig: false
    },
    status: 'active'
  },
  {
    id: 3,
    createdAt: '2024-01-12 09:15',
    code: 'CHECKER',
    name: 'Transaction Checker',
    institution: 'Bank of America',
    description: 'Can review and approve transactions',
    permissions: {
      userManagement: false,
      roleManagement: false,
      transactionView: true,
      transactionApprove: true,
      reportGeneration: true,
      systemConfig: false
    },
    status: 'active'
  },
  {
    id: 4,
    createdAt: '2024-01-10 16:45',
    code: 'VIEWER',
    name: 'Read Only Viewer',
    institution: 'Citibank',
    description: 'View-only access to system data',
    permissions: {
      userManagement: false,
      roleManagement: false,
      transactionView: true,
      transactionApprove: false,
      reportGeneration: false,
      systemConfig: false
    },
    status: 'inactive'
  },
  {
    id: 5,
    createdAt: '2024-01-08 11:00',
    code: 'AUDITOR',
    name: 'Audit Manager',
    institution: 'Chase Bank',
    description: 'Audit and compliance monitoring',
    permissions: {
      userManagement: false,
      roleManagement: false,
      transactionView: true,
      transactionApprove: false,
      reportGeneration: true,
      systemConfig: false
    },
    status: 'active'
  }
];

const mockInbox = [
  {
    id: 1,
    requestDate: '2024-01-16 09:30',
    processId: 'PR-2024-001',
    code: 'SUPERVISOR',
    name: 'Supervisor Role',
    createdBy: 'John Anderson',
    operation: 'create',
    comments: 'New supervisor role for branch managers'
  },
  {
    id: 2,
    requestDate: '2024-01-15 14:20',
    processId: 'PR-2024-002',
    code: 'ADMIN',
    name: 'Administrator',
    modifiedBy: 'Sarah Chen',
    operation: 'update',
    comments: 'Updated permissions for admin role'
  },
  {
    id: 3,
    requestDate: '2024-01-14 11:45',
    processId: 'PR-2024-003',
    code: 'TEMP_USER',
    name: 'Temporary User',
    createdBy: 'Mike Johnson',
    operation: 'delete',
    comments: 'Removing deprecated temporary role'
  }
];

export function RoleManagement() {
  const [activeTab, setActiveTab] = useState('listing');
  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    institution: '',
    description: '',
    permissions: {
      userManagement: false,
      roleManagement: false,
      transactionView: false,
      transactionApprove: false,
      reportGeneration: false,
      systemConfig: false
    },
    status: 'active' as 'active' | 'inactive'
  });

  const handleOpenModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        code: role.code,
        name: role.name,
        institution: role.institution,
        description: role.description,
        permissions: role.permissions,
        status: role.status
      });
    } else {
      setEditingRole(null);
      setFormData({
        code: '',
        name: '',
        institution: '',
        description: '',
        permissions: {
          userManagement: false,
          roleManagement: false,
          transactionView: false,
          transactionApprove: false,
          reportGeneration: false,
          systemConfig: false
        },
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  const handleSubmit = () => {
    console.log('Submitting role:', formData);
    handleCloseModal();
  };

  const roleColumns = [
    {
      key: 'createdAt',
      label: 'Created At',
      width: '180px'
    },
  {
    key: 'code',
    label: 'Code',
    width: '120px'
  },
  {
    key: 'name',
    label: 'Name',
    width: '200px'
  },
  {
    key: 'institution',
    label: 'Institution',
    width: '180px'
  },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
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
        label: 'Edit Role',
        onClick: () => handleOpenModal(row),
        icon: <Edit className="h-4 w-4" />
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
    key: 'code',
    label: 'Code',
    width: '120px'
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
    width: '250px'
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
        title="Role Management"
        breadcrumb="Home / Roles"
        primaryAction={
        activeTab === 'listing' ?
        {
          label: 'Add Role',
          onClick: () => handleOpenModal()
        } :
        undefined
        } />
      

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 overflow-hidden">
        <Tabs
          tabs={[
          {
            id: 'listing',
            label: 'All Roles',
            count: mockRoles.length
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
                placeholder: 'Search by code...',
                value: searchCode,
                onChange: setSearchCode
              },
              {
                type: 'search',
                placeholder: 'Search by name...',
                value: searchName,
                onChange: setSearchName
              },
              {
                type: 'select',
                placeholder: 'All Institutions',
                value: institutionFilter,
                onChange: setInstitutionFilter,
                options: [
                {
                  value: 'chase',
                  label: 'Chase Bank'
                },
                {
                  value: 'wells',
                  label: 'Wells Fargo'
                },
                {
                  value: 'boa',
                  label: 'Bank of America'
                },
                {
                  value: 'citi',
                  label: 'Citibank'
                }]

              },
              {
                type: 'select',
                placeholder: 'All Status',
                value: statusFilter,
                onChange: setStatusFilter,
                options: [
                {
                  value: 'active',
                  label: 'Active'
                },
                {
                  value: 'inactive',
                  label: 'Inactive'
                }]

              }]
              } />
            

              <DataTable
              columns={roleColumns}
              data={mockRoles}
              emptyState={
              <EmptyState
                icon={Shield}
                title="No roles available"
                description="Create your first role to get started with access control management" />

              } />
            

              <Pagination
              currentPage={currentPage}
              totalPages={1}
              pageSize={pageSize}
              totalItems={mockRoles.length}
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
                description="All role requests have been processed" />

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

      {/* Add/Edit Role Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingRole ? 'Edit Role' : 'Add New Role'}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Role Code"
              placeholder="e.g., ADMIN, MAKER"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Role Name"
              placeholder="e.g., Administrator"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <Select
            label="Institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            options={[
              { value: 'Chase Bank', label: 'Chase Bank' },
              { value: 'Wells Fargo', label: 'Wells Fargo' },
              { value: 'Bank of America', label: 'Bank of America' },
              { value: 'Citibank', label: 'Citibank' }
            ]}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe the role responsibilities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Switch
                label="User Management"
                checked={formData.permissions.userManagement}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, userManagement: checked }
                })}
              />
              <Switch
                label="Role Management"
                checked={formData.permissions.roleManagement}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, roleManagement: checked }
                })}
              />
              <Switch
                label="Transaction View"
                checked={formData.permissions.transactionView}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, transactionView: checked }
                })}
              />
              <Switch
                label="Transaction Approve"
                checked={formData.permissions.transactionApprove}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, transactionApprove: checked }
                })}
              />
              <Switch
                label="Report Generation"
                checked={formData.permissions.reportGeneration}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, reportGeneration: checked }
                })}
              />
              <Switch
                label="System Configuration"
                checked={formData.permissions.systemConfig}
                onChange={(checked) => setFormData({
                  ...formData,
                  permissions: { ...formData.permissions, systemConfig: checked }
                })}
              />
            </div>
          </div>

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
            required
          />
        </div>
      </Modal>
    </motion.div>
  );
}
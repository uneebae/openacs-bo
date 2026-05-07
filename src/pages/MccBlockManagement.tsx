import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit, Trash2, Ban, Eye, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Textarea } from '../components/forms/Textarea';
import { Tabs } from '../components/common/Tabs';
import { DataTable } from '../components/common/DataTable';
import { ActionMenu } from '../components/common/ActionMenu';
import { PageHeader } from '../components/common/PageHeader';

// Global MCC Block List Data
const globalMccBlocks = [
  {
    id: 1,
    createdAt: '15-12-2025 04:20:24 PM',
    effectiveAt: '07-08-2026 10:30:00 AM',
    mccCode: '7278',
    status: 'blocked',
    description: 'Buying and Shopping Services and Clubs',
    mccGroup: 'Service Providers'
  },
  {
    id: 2,
    createdAt: '15-12-2025 04:17:49 PM',
    effectiveAt: '07-08-2026 10:30:00 AM',
    mccCode: '7012',
    status: 'blocked',
    description: 'Timeshares',
    mccGroup: 'Service Providers'
  },
  {
    id: 3,
    createdAt: '14-12-2025 02:45:30 PM',
    effectiveAt: '06-08-2026 09:00:00 AM',
    mccCode: '5993',
    status: 'blocked',
    description: 'Tobacco and Cigar Stores',
    mccGroup: 'Retail Trade'
  },
  {
    id: 4,
    createdAt: '10-12-2025 10:15:20 AM',
    effectiveAt: '03-08-2026 08:00:00 AM',
    mccCode: '6051',
    status: 'blocked',
    description: 'Quasi-Cash Merchants / Crypto',
    mccGroup: 'Financial Services'
  }
];

// Participant MCC Blocks (empty for now)
const participantMccBlocks: any[] = [];

// Inbox/Requests Data
const inboxRequests: any[] = [];

const categoryOptions = [
  { value: 'high_risk', label: 'High Risk' },
  { value: 'restricted', label: 'Restricted' },
  { value: 'prohibited', label: 'Prohibited' },
  { value: 'compliance', label: 'Compliance' }
];

export function MccBlockManagement() {
  const [activeTab, setActiveTab] = useState('global');
  const [showModal, setShowModal] = useState(false);
  const [selectedMcc, setSelectedMcc] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mccGroupFilter, setMccGroupFilter] = useState('');
  
  const [formData, setFormData] = useState({
    mccCode: '',
    description: '',
    category: '',
    effectiveDate: '',
    reason: ''
  });

  const handleAdd = () => {
    setSelectedMcc(null);
    setFormData({
      mccCode: '',
      description: '',
      category: '',
      effectiveDate: '',
      reason: ''
    });
    setShowModal(true);
  };

  const handleEdit = (mcc: any) => {
    setSelectedMcc(mcc);
    setFormData({
      mccCode: mcc.mccCode,
      description: mcc.description,
      category: mcc.category,
      effectiveDate: mcc.effectiveDate,
      reason: ''
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setShowModal(false);
  };

  // Global MCC Blocks Table
  const globalColumns = [
    {
      key: 'createdAt',
      label: 'Created At',
      width: '180px',
      render: (dt: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{dt}</span>
    },
    {
      key: 'effectiveAt',
      label: 'Effective At',
      width: '180px',
      render: (dt: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{dt}</span>
    },
    {
      key: 'mccCode',
      label: 'MCC Code',
      width: '140px',
      render: (code: string) => <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">{code}</span>
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (status: string) => (
        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      width: '250px',
      render: (desc: string) => <span className="text-sm text-gray-700 dark:text-gray-300">{desc}</span>
    },
    {
      key: 'mccGroup',
      label: 'MCC Group',
      width: '180px',
      render: (group: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{group}</span>
    },
    {
      key: 'action',
      label: 'Action',
      width: '80px',
      render: (_: any, row: any) => (
        <ActionMenu
          actions={[
            {
              label: 'View Details',
              onClick: () => handleEdit(row),
              icon: <Eye className="h-4 w-4" />
            },
            {
              label: 'Edit',
              onClick: () => handleEdit(row),
              icon: <Edit className="h-4 w-4" />
            },
            {
              label: 'Delete',
              onClick: () => console.log('Delete:', row),
              icon: <Trash2 className="h-4 w-4" />
            }
          ]}
        />
      )
    }
  ];

  // Participant MCC Blocks Table
  const participantColumns = [
    {
      key: 'createdAt',
      label: 'Created At',
      width: '180px',
      render: (dt: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{dt}</span>
    },
    {
      key: 'effectiveAt',
      label: 'Effective At',
      width: '180px',
      render: (dt: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{dt}</span>
    },
    {
      key: 'participant',
      label: 'Participant',
      width: '180px',
      render: (participant: string) => <span className="text-sm text-gray-700 dark:text-gray-300">{participant}</span>
    },
    {
      key: 'mccCode',
      label: 'MCC Code',
      width: '140px',
      render: (code: string) => <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">{code}</span>
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (status: string) => (
        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      width: '250px',
      render: (desc: string) => <span className="text-sm text-gray-700 dark:text-gray-300">{desc}</span>
    },
    {
      key: 'mccGroup',
      label: 'MCC Group',
      width: '180px',
      render: (group: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{group}</span>
    },
    {
      key: 'action',
      label: 'Action',
      width: '80px',
      render: (_: any, row: any) => (
        <ActionMenu
          actions={[
            {
              label: 'View Details',
              onClick: () => handleEdit(row),
              icon: <Eye className="h-4 w-4" />
            },
            {
              label: 'Edit',
              onClick: () => handleEdit(row),
              icon: <Edit className="h-4 w-4" />
            }
          ]}
        />
      )
    }
  ];

  // Inbox Table
  const inboxColumns = [
    {
      key: 'requestDate',
      label: 'Request Date',
      width: '180px',
      render: (dt: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{dt}</span>
    },
    {
      key: 'processId',
      label: 'Process ID',
      width: '140px',
      render: (id: string) => <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">{id}</span>
    },
    {
      key: 'mccCodes',
      label: 'MCC Codes',
      width: '150px',
      render: (codes: string) => <span className="text-sm text-gray-700 dark:text-gray-300">{codes}</span>
    },
    {
      key: 'operation',
      label: 'Operation',
      width: '140px',
      render: (op: string) => <span className="text-sm text-gray-600 dark:text-gray-400">{op}</span>
    },
    {
      key: 'createdBy',
      label: 'Created / Modified By',
      width: '200px',
      render: (by: string) => <span className="text-sm text-gray-700 dark:text-gray-300">{by}</span>
    },
    {
      key: 'status',
      label: 'Status',
      width: '140px',
      render: (status: string) => {
        const statusConfig: any = {
          pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300' },
          approved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
          rejected: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <span className={`px-3 py-1 rounded-full ${config.bg} ${config.text} text-sm font-medium`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      }
    },
    {
      key: 'comments',
      label: 'Comments',
      width: '200px',
      render: (comments: string) => <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{comments || '-'}</span>
    },
    {
      key: 'action',
      label: 'Action',
      width: '80px',
      render: (_: any, row: any) => (
        <ActionMenu
          actions={[
            {
              label: 'View Details',
              onClick: () => console.log('View:', row),
              icon: <Eye className="h-4 w-4" />
            },
            {
              label: 'Approve',
              onClick: () => console.log('Approve:', row),
              icon: <CheckCircle className="h-4 w-4" />
            },
            {
              label: 'Reject',
              onClick: () => console.log('Reject:', row),
              icon: <AlertCircle className="h-4 w-4" />
            }
          ]}
        />
      )
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="MCC Block Management"
        breadcrumb="Home / MCC Block Management"
        primaryAction={{
          label: 'Block MCCs',
          onClick: handleAdd
        }}
      />

      {/* Tabs for different views */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <Tabs
          tabs={[
            {
              id: 'global',
              label: 'Global MCC Block List',
              count: globalMccBlocks.length
            },
            {
              id: 'participant',
              label: 'Participant MCC Block List',
              count: participantMccBlocks.length
            },
            {
              id: 'inbox',
              label: 'MCC Block Maker Inbox',
              count: inboxRequests.length
            }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          {/* Global MCC Block List */}
          {activeTab === 'global' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  placeholder="Search by MCC code..."
                  leftIcon={<Search className="h-4 w-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select
                  options={[
                    { value: '', label: 'All' },
                    { value: 'Service Providers', label: 'Service Providers' },
                    { value: 'Retail Trade', label: 'Retail Trade' },
                    { value: 'Financial Services', label: 'Financial Services' }
                  ]}
                  value={mccGroupFilter}
                  onChange={(e) => setMccGroupFilter(e.target.value)}
                />
              </div>
              <DataTable
                columns={globalColumns}
                data={globalMccBlocks}
              />
            </motion.div>
          )}

          {/* Participant MCC Block List */}
          {activeTab === 'participant' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Input
                  placeholder="Search by MCC code..."
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <Select
                  options={[
                    { value: '', label: 'All' },
                    { value: 'Participant 1', label: 'Participant 1' },
                    { value: 'Participant 2', label: 'Participant 2' }
                  ]}
                />
                <Select
                  options={[
                    { value: '', label: 'All' },
                    { value: 'Service Providers', label: 'Service Providers' },
                    { value: 'Retail Trade', label: 'Retail Trade' }
                  ]}
                />
              </div>
              {participantMccBlocks.length === 0 ? (
                <div className="text-center py-12">
                  <Ban className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No rows found</p>
                </div>
              ) : (
                <DataTable
                  columns={participantColumns}
                  data={participantMccBlocks}
                />
              )}
            </motion.div>
          )}

          {/* Inbox */}
          {activeTab === 'inbox' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search by Process ID..."
                  leftIcon={<Search className="h-4 w-4" />}
                  className="flex-1"
                />
              </div>
              {inboxRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No rows found</p>
                </div>
              ) : (
                <DataTable
                  columns={inboxColumns}
                  data={inboxRequests}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedMcc ? 'Edit MCC Block' : 'Add MCC Block'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="MCC Code"
            placeholder="e.g., 7995"
            value={formData.mccCode}
            onChange={(e) => setFormData({ ...formData, mccCode: e.target.value })}
            helperText="4-digit merchant category code"
            required
          />

          <Input
            label="Description"
            placeholder="e.g., Betting / Casino Gambling"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
            required
          />

          <Input
            label="Effective Date"
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
            required
          />

          <Textarea
            label="Reason for Blocking"
            placeholder="Explain why this MCC code is being blocked..."
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
            required
          />

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Warning:</strong> Blocking an MCC code will prevent all transactions under this category from being processed.
            </p>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              {selectedMcc ? 'Update Block' : 'Create Block'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

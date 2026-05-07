import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, CheckCircle2, XCircle, Plug, Inbox } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Tabs } from '../components/common/Tabs';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ActionMenu } from '../components/common/ActionMenu';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
const mockApiConfigs = [
{
  id: 1,
  participantName: 'Chase Bank',
  cardInquiry: 'configured',
  generateOtp: 'configured',
  otpValidation: 'configured'
},
{
  id: 2,
  participantName: 'Wells Fargo',
  cardInquiry: 'configured',
  generateOtp: 'configured',
  otpValidation: 'not-configured'
},
{
  id: 3,
  participantName: 'Bank of America',
  cardInquiry: 'configured',
  generateOtp: 'not-configured',
  otpValidation: 'not-configured'
},
{
  id: 4,
  participantName: 'Citibank',
  cardInquiry: 'configured',
  generateOtp: 'configured',
  otpValidation: 'configured'
},
{
  id: 5,
  participantName: 'Capital One',
  cardInquiry: 'not-configured',
  generateOtp: 'not-configured',
  otpValidation: 'not-configured'
},
{
  id: 6,
  participantName: 'HSBC',
  cardInquiry: 'configured',
  generateOtp: 'configured',
  otpValidation: 'configured'
}];

const mockApiInbox = [
{
  id: 1,
  requestDate: '2024-02-14 09:30',
  processId: 'PAC-2024-001',
  participantName: 'Metro Bank',
  operation: 'create',
  createdBy: 'Uneeb Ahmed',
  status: 'pending',
  comments: 'Initial API setup for new participant'
},
{
  id: 2,
  requestDate: '2024-02-13 14:20',
  processId: 'PAC-2024-002',
  participantName: 'Chase Bank',
  operation: 'update',
  modifiedBy: 'Uneeb Ahmed',
  status: 'pending',
  comments: 'Updating OTP validation endpoint'
},
{
  id: 3,
  requestDate: '2024-02-12 11:45',
  processId: 'PAC-2024-003',
  participantName: 'Goldman Sachs',
  operation: 'update',
  createdBy: 'Uneeb Ahmed',
  status: 'pending',
  comments: 'Refreshing API credentials'
}];

export function ApiConfigManagement() {
  const [activeTab, setActiveTab] = useState('listing');
  const [search, setSearch] = useState('');
  const [setupFilter, setSetupFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const apiColumns = [
  {
    key: 'participantName',
    label: 'Participant Name',
    width: '220px',
    render: (name: string) =>
    <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary text-sm font-semibold">
            {name.
        split(' ').
        map((w) => w[0]).
        join('').
        slice(0, 2)}
          </div>
          <span className="font-medium text-navy">{name}</span>
        </div>

  },
  {
    key: 'cardInquiry',
    label: 'Card Inquiry Setup',
    width: '180px',
    render: (s: string) =>
    <StatusBadge status={s as 'configured' | 'not-configured'} />

  },
  {
    key: 'generateOtp',
    label: 'Generate OTP Setup',
    width: '180px',
    render: (s: string) =>
    <StatusBadge status={s as 'configured' | 'not-configured'} />

  },
  {
    key: 'otpValidation',
    label: 'OTP Validation Setup',
    width: '190px',
    render: (s: string) =>
    <StatusBadge status={s as 'configured' | 'not-configured'} />

  },
  {
    key: 'action',
    label: 'Actions',
    width: '80px',
    render: () =>
    <ActionMenu
      actions={[
      {
        label: 'View Setup',
        onClick: () => {},
        icon: <Eye className="h-4 w-4" />
      },
      {
        label: 'Edit Configuration',
        onClick: () => {},
        icon: <Edit className="h-4 w-4" />
      }]
      } />


  }];

  const inboxColumns = [
  {
    key: 'requestDate',
    label: 'Request Date',
    width: '170px'
  },
  {
    key: 'processId',
    label: 'Process ID',
    width: '140px'
  },
  {
    key: 'participantName',
    label: 'Participant Name',
    width: '200px'
  },
  {
    key: 'operation',
    label: 'Operation',
    width: '120px',
    render: (op: string) =>
    <StatusBadge status={op as 'create' | 'update' | 'delete'} />

  },
  {
    key: 'createdBy',
    label: 'Created/Modified By',
    width: '170px',
    render: (_: any, row: any) => row.createdBy || row.modifiedBy
  },
  {
    key: 'status',
    label: 'Status',
    width: '110px',
    render: (s: string) => <StatusBadge status={s as 'pending'} />
  },
  {
    key: 'comments',
    label: 'Comments',
    width: '260px'
  },
  {
    key: 'action',
    label: 'Actions',
    width: '80px',
    render: () =>
    <ActionMenu
      actions={[
      {
        label: 'View Request',
        onClick: () => {},
        icon: <Eye className="h-4 w-4" />
      },
      {
        label: 'Approve',
        onClick: () => {},
        icon: <CheckCircle2 className="h-4 w-4" />
      },
      {
        label: 'Reject',
        onClick: () => {},
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
        title="API Configuration"
        breadcrumb="Home / API Configuration"
      />
      

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <Tabs
          tabs={[
          {
            id: 'listing',
            label: 'All Configurations',
            count: mockApiConfigs.length
          },
          {
            id: 'inbox',
            label: 'Maker Inbox',
            count: mockApiInbox.length
          }]
          }
          activeTab={activeTab}
          onChange={setActiveTab} />
        

        <div className="p-6">
          {activeTab === 'listing' ?
          <>
              <FilterBar
              fields={[
              {
                type: 'search',
                placeholder: 'Search by participant name...',
                value: search,
                onChange: setSearch
              },
              {
                type: 'select',
                placeholder: 'All Setups',
                value: setupFilter,
                onChange: setSetupFilter,
                options: [
                {
                  value: 'configured',
                  label: 'Fully Configured'
                },
                {
                  value: 'partial',
                  label: 'Partially Configured'
                },
                {
                  value: 'not-configured',
                  label: 'Not Configured'
                }]

              }]
              } />
            
              <DataTable
              columns={apiColumns}
              data={mockApiConfigs}
              emptyState={
              <EmptyState
                icon={Plug}
                title="No API configurations"
                description="Configure API endpoints for your participants" />

              } />
            
              <Pagination
              currentPage={currentPage}
              totalPages={1}
              pageSize={pageSize}
              totalItems={mockApiConfigs.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize} />
            
            </> :

          <>
              <DataTable
              columns={inboxColumns}
              data={mockApiInbox}
              emptyState={
              <EmptyState
                icon={Inbox}
                title="No pending approvals"
                description="All API configuration requests have been processed" />

              } />
            
              <Pagination
              currentPage={currentPage}
              totalPages={1}
              pageSize={pageSize}
              totalItems={mockApiInbox.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize} />
            
            </>
          }
        </div>
      </div>
    </motion.div>);

}
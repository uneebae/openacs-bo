import React from 'react';
interface StatusBadgeProps {
  status:
  'active' |
  'inactive' |
  'pending' |
  'approved' |
  'rejected' |
  'create' |
  'update' |
  'delete' |
  'blocked' |
  'configured' |
  'not-configured' |
  'success' |
  'failed';
  label?: string;
}
const statusConfig = {
  active: {
    bg: 'bg-success-50',
    text: 'text-success',
    label: 'Active'
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: 'Inactive'
  },
  pending: {
    bg: 'bg-warning-50',
    text: 'text-warning',
    label: 'Pending'
  },
  approved: {
    bg: 'bg-success-50',
    text: 'text-success',
    label: 'Approved'
  },
  rejected: {
    bg: 'bg-error-50',
    text: 'text-error',
    label: 'Rejected'
  },
  create: {
    bg: 'bg-primary-50',
    text: 'text-primary',
    label: 'Create'
  },
  update: {
    bg: 'bg-warning-50',
    text: 'text-warning',
    label: 'Update'
  },
  delete: {
    bg: 'bg-error-50',
    text: 'text-error',
    label: 'Delete'
  },
  blocked: {
    bg: 'bg-error-50',
    text: 'text-error',
    label: 'Blocked'
  },
  configured: {
    bg: 'bg-success-50',
    text: 'text-success',
    label: 'Configured'
  },
  'not-configured': {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    label: 'Not Configured'
  },
  success: {
    bg: 'bg-success-50',
    text: 'text-success',
    label: 'Success'
  },
  failed: {
    bg: 'bg-error-50',
    text: 'text-error',
    label: 'Failed'
  }
};
export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.text.replace('text-', 'bg-')}`}>
      </span>
      {displayLabel}
    </span>);

}
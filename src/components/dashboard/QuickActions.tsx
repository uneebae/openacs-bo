import React from 'react';
import {
  UserPlus,
  Building2,
  Plug,
  Workflow,
  FileDown,
  History } from
'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onAction?: (action: string) => void;
}

const actions = [
{
  icon: UserPlus,
  label: 'Add User',
  color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  action: 'users'
},
{
  icon: Building2,
  label: 'Add Participant',
  color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
  action: 'participants'
},
{
  icon: Plug,
  label: 'Configure API',
  color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  action: 'api'
},
{
  icon: Workflow,
  label: 'Create Rule',
  color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  action: 'rules'
},
{
  icon: FileDown,
  label: 'Export Report',
  color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  action: 'reports'
},
{
  icon: History,
  label: 'View Audit Logs',
  color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
  action: 'auth-history'
}];

export function QuickActions({ onAction }: QuickActionsProps) {
  const handleActionClick = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (index * 0.05) }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleActionClick(action.action)}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group shadow-sm hover:shadow-md cursor-pointer">
              
              <div
                className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform shadow-sm`}>
                
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                {action.label}
              </span>
            </motion.button>);

        })}
      </div>
    </motion.div>);

}
import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
  onBack?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}
export function PageHeader({
  title,
  breadcrumb,
  onBack,
  primaryAction
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="mb-6">
      
      {breadcrumb &&
      <div className="flex items-center gap-2 mb-2">
          {onBack &&
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Go back">
          
              <ArrowLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
        }
          <p className="text-sm text-gray-500 dark:text-gray-400">{breadcrumb}</p>
        </div>
      }

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {primaryAction &&
        <motion.button
          whileHover={{
            y: -2
          }}
          whileTap={{
            scale: 0.98
          }}
          onClick={primaryAction.onClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md">
          
            <Plus className="h-4 w-4" />
            {primaryAction.label}
          </motion.button>
        }
      </div>
    </motion.div>);

}
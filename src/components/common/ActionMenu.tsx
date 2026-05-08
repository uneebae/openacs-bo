import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface Action {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  icon?: React.ReactNode;
}
interface ActionMenuProps {
  actions: Action[];
}
export function ActionMenu({ actions }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Actions">
        
        <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen &&
        <>
            <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)} />
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -10
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -10
            }}
            transition={{
              duration: 0.15
            }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
            
              <div className="py-1">
                {actions.map((action, index) =>
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`
                      w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors
                      ${action.variant === 'danger' ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}>
                
                    {action.icon &&
                <span className="flex-shrink-0">{action.icon}</span>
                }
                    {action.label}
                  </button>
              )}
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}
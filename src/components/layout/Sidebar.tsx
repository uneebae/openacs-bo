import React, { useState } from 'react';
import {
  LayoutDashboard,
  Grid3x3,
  Shield,
  Users,
  Building2,
  Workflow,
  Ban,
  Globe,
  Plug,
  History,
  CreditCard,
  FileBarChart,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'modules',
    label: 'Application Menu',
    icon: Grid3x3
  },
  {
    id: 'roles',
    label: 'Role Management',
    icon: Shield
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users
  },
  {
    id: 'participants',
    label: 'Participant Management',
    icon: Building2
  },
  {
    id: 'rules',
    label: 'Rule Engine Management',
    icon: Workflow
  },
  {
    id: 'mcc',
    label: 'MCC Block Management',
    icon: Ban
  },
  {
    id: 'country',
    label: 'Country Block Management',
    icon: Globe
  },
  {
    id: 'api',
    label: 'API Configuration',
    icon: Plug
  },
  {
    id: 'auth-history',
    label: 'Authentication History',
    icon: History
  },
  {
    id: 'card-status',
    label: 'Card Status Management',
    icon: CreditCard
  },
  {
    id: 'reports',
    label: 'Report Catalog',
    icon: FileBarChart
  }
];

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col shadow-lg"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen ? <Logo size="md" /> : <Logo size="md" showText={false} />}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                  title={!isOpen ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                  
                  {isOpen && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-5 w-5 text-yellow-500" />
                {isOpen && <span className="text-sm text-gray-600 dark:text-gray-300">Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-primary-600" />
                {isOpen && <span className="text-sm text-gray-600 dark:text-gray-300">Dark Mode</span>}
              </>
            )}
          </button>

          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? (
              <>
                <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </motion.aside>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}
    </>
  );
}
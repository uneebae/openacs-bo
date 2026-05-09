import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Shield,
  Users,
  Building2,
  Workflow,
  Ban,
  Globe,
  Plug,
  History,
  CreditCard,
  FileBarChart } from
'lucide-react';
interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  submodules?: {
    name: string;
    description: string;
  }[];
}

interface ModuleDirectoryProps {
  onNavigate: (page: string) => void;
}
const modules: Module[] = [
{
  id: 'roles',
  name: 'Role Management',
  description: 'Manage user roles, permissions, and access control policies',
  icon: Shield,
  color: 'blue',
  submodules: [
  {
    name: 'Create Role',
    description: 'Define new user roles'
  },
  {
    name: 'Assign Permissions',
    description: 'Configure role permissions'
  },
  {
    name: 'Role Hierarchy',
    description: 'Manage role relationships'
  }]

},
{
  id: 'users',
  name: 'User Management',
  description: 'Create, edit, and manage system users and their profiles',
  icon: Users,
  color: 'purple',
  submodules: [
  {
    name: 'User Directory',
    description: 'Browse all users'
  },
  {
    name: 'Add User',
    description: 'Create new user accounts'
  },
  {
    name: 'User Activity',
    description: 'Monitor user actions'
  }]

},
{
  id: 'participants',
  name: 'Participant Management',
  description: 'Manage financial institutions and payment participants',
  icon: Building2,
  color: 'teal',
  submodules: [
  {
    name: 'Register Participant',
    description: 'Onboard new institutions'
  },
  {
    name: 'Participant Directory',
    description: 'View all participants'
  },
  {
    name: 'Compliance Status',
    description: 'Track compliance'
  }]

},
{
  id: 'rules',
  name: 'Rule Engine Management',
  description:
  'Configure transaction rules, fraud detection, and risk policies',
  icon: Workflow,
  color: 'indigo'
},
{
  id: 'mcc',
  name: 'MCC Block Management',
  description: 'Manage merchant category code blocking rules',
  icon: Ban,
  color: 'red'
},
{
  id: 'country',
  name: 'Country Block Management',
  description: 'Configure geographic restrictions and country-based rules',
  icon: Globe,
  color: 'green'
},
{
  id: 'api',
  name: 'API Configuration',
  description: 'Manage API endpoints, keys, and integration settings',
  icon: Plug,
  color: 'cyan'
},
{
  id: 'auth-history',
  name: 'Authentication History',
  description: 'View transaction authentication logs and audit trails',
  icon: History,
  color: 'amber'
},
{
  id: 'card-status',
  name: 'Card Status Management',
  description: 'Monitor and manage card enrollment and status',
  icon: CreditCard,
  color: 'pink'
},
{
  id: 'reports',
  name: 'Report Catalog',
  description: 'Generate and export compliance and analytics reports',
  icon: FileBarChart,
  color: 'violet'
}];

const colorClasses: Record<string, { bg: string; icon: string; dot: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-600 dark:bg-blue-400'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-600 dark:bg-purple-400'
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    icon: 'text-teal-600 dark:text-teal-400',
    dot: 'bg-teal-600 dark:bg-teal-400'
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    icon: 'text-indigo-600 dark:text-indigo-400',
    dot: 'bg-indigo-600 dark:bg-indigo-400'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    icon: 'text-red-600 dark:text-red-400',
    dot: 'bg-red-600 dark:bg-red-400'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    dot: 'bg-green-600 dark:bg-green-400'
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    icon: 'text-cyan-600 dark:text-cyan-400',
    dot: 'bg-cyan-600 dark:bg-cyan-400'
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    icon: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-600 dark:bg-amber-400'
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    icon: 'text-pink-600 dark:text-pink-400',
    dot: 'bg-pink-600 dark:bg-pink-400'
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    icon: 'text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-600 dark:bg-violet-400'
  }
};

export function ModuleDirectory({ onNavigate }: ModuleDirectoryProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  
  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };
  
  const handleModuleClick = (moduleId: string) => {
    onNavigate(moduleId);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Application Menu</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Access all system modules and features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isExpanded = expandedModule === module.id;
          const colors = colorClasses[module.color] || colorClasses.blue;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <button
                onClick={() => handleModuleClick(module.id)}
                className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
              >
                <div className={`flex-shrink-0 p-3 ${colors.bg} rounded-xl group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {module.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>
                {module.submodules && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModule(module.id);
                    }}
                    className={`flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:${colors.icon} transition-colors cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isExpanded && module.submodules && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                  >
                    <div className="p-4 space-y-2">
                      {module.submodules.map((sub, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 border border-transparent transition-all cursor-pointer group"
                        >
                          <div className={`h-2 w-2 rounded-full ${colors.dot} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`}></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {sub.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
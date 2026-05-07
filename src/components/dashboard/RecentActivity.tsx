import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Settings,
  UserPlus } from
'lucide-react';
import { motion } from 'framer-motion';
interface Activity {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  icon: React.ReactNode;
  description: string;
  user: string;
  timestamp: string;
}
const activities: Activity[] = [
{
  id: '1',
  type: 'success',
  icon: <CheckCircle2 className="h-4 w-4" />,
  description: 'New rule "High-Risk MCC Block" activated',
  user: 'Uneeb Ahmed',
  timestamp: '5 minutes ago'
},
{
  id: '2',
  type: 'info',
  icon: <UserPlus className="h-4 w-4" />,
  description: 'New participant "Metro Bank" registered',
  user: 'Uneeb Ahmed',
  timestamp: '12 minutes ago'
},
{
  id: '3',
  type: 'warning',
  icon: <AlertTriangle className="h-4 w-4" />,
  description: 'Multiple failed authentication attempts detected',
  user: 'System',
  timestamp: '28 minutes ago'
},
{
  id: '4',
  type: 'info',
  icon: <Settings className="h-4 w-4" />,
  description: 'API configuration updated for endpoint /v2/auth',
  user: 'Uneeb Ahmed',
  timestamp: '1 hour ago'
},
{
  id: '5',
  type: 'error',
  icon: <XCircle className="h-4 w-4" />,
  description: 'Transaction rejected due to country block (RU)',
  user: 'System',
  timestamp: '2 hours ago'
}];

const typeColors = {
  success: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  error: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  warning: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  info: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
};
export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) =>
        <motion.div 
          key={activity.id} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
            <div
              className={`p-2.5 rounded-lg ${typeColors[activity.type]} flex-shrink-0 shadow-sm`}>
            
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1.5 leading-relaxed">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">{activity.user}</span>
                <span>•</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>);

}
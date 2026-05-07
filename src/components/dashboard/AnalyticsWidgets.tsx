import React from 'react';
import { CheckCircle2, Clock, Activity, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function AnalyticsWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:scale-110 transition-transform">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Approval Ratio</h4>
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">94.2%</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400 mb-1.5">+2.1%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '94.2%' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Avg Latency</h4>
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">142ms</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400 mb-1.5">-8ms</span>
        </div>
        <div className="flex gap-1 h-12 items-end">
          {[65, 72, 68, 75, 70, 68, 65, 62].map((h, i) =>
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
            className="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 rounded-sm"
          />
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-teal-50 dark:bg-teal-900/20 rounded-lg group-hover:scale-110 transition-transform">
            <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">API Health</h4>
        </div>
        <div className="space-y-3 mt-4">
          {[
            { name: 'Auth API', status: 'Healthy' },
            { name: 'Payment API', status: 'Healthy' },
            { name: 'Verification API', status: 'Healthy' }
          ].map((api, i) =>
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-600 dark:text-gray-400 font-medium">{api.name}</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-semibold text-xs">{api.status}</span>
            </div>
          </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg group-hover:scale-110 transition-transform">
            <Building2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Top Participants
          </h4>
        </div>
        <div className="space-y-3 mt-4">
          {[
          {
            name: 'Chase Bank',
            count: 1247
          },
          {
            name: 'Wells Fargo',
            count: 982
          },
          {
            name: 'Bank of America',
            count: 856
          },
          {
            name: 'Citibank',
            count: 734
          }].
          map((p, i) =>
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="flex items-center justify-between text-sm"
          >
              <span className="text-gray-600 dark:text-gray-400 truncate font-medium">{p.name}</span>
              <span className="text-gray-900 dark:text-white font-bold">{p.count}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>);

}
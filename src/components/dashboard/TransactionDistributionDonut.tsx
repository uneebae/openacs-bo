import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { EmptyState } from '../common/EmptyState';
import { PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface DistributionData {
  name: string;
  value: number;
  color: string;
}
interface TransactionDistributionDonutProps {
  data?: DistributionData[];
}
export function TransactionDistributionDonut({
  data
}: TransactionDistributionDonutProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Transaction Distribution
        </h3>
        <EmptyState
          icon={PieChartIcon}
          title="No distribution data"
          description="Transaction breakdown will appear here" />
        
      </motion.div>);

  }
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Transaction Distribution
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            animationDuration={800}>
            
            {data.map((entry, index) =>
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              className="hover:opacity-80 transition-opacity" />
            )}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan
              x="50%"
              dy="-0.5em"
              fontSize="28"
              fontWeight="700"
              className="fill-gray-900 dark:fill-white">
              {total.toLocaleString()}
            </tspan>
            <tspan x="50%" dy="1.8em" fontSize="13" className="fill-gray-500 dark:fill-gray-400">
              Total
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-3">
        {data.map((item, index) =>
        <motion.div 
          key={index} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full shadow-sm"
                style={{
                  backgroundColor: item.color
                }}>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {item.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {(item.value / total * 100).toFixed(1)}%
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>);

}
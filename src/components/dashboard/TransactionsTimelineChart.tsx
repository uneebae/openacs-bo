import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { EmptyState } from '../common/EmptyState';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataPoint {
  time: string;
  transactions: number;
}
interface TransactionsTimelineChartProps {
  data?: DataPoint[];
}
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 px-4 py-2.5 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {payload[0].payload.time}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Transactions:{' '}
          <span className="font-bold text-primary-600 dark:text-primary-400">
            {payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>);

  }
  return null;
};
export function TransactionsTimelineChart({
  data
}: TransactionsTimelineChartProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Transactions Timeline
        </h3>
        <EmptyState
          icon={TrendingUp}
          title="No transaction data available"
          description="Analytics will appear here once transactions are processed" />
        
      </motion.div>);

  }
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transactions Timeline
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            <div className="h-2 w-2 rounded-full bg-primary-600 animate-pulse"></div>
            <span className="font-medium">24 Hour Trend</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0
          }}>
          
          <defs>
            <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
            vertical={false} />
          
          <XAxis
            dataKey="time"
            className="text-gray-600 dark:text-gray-400"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'currentColor' }} />
          
          <YAxis
            className="text-gray-600 dark:text-gray-400"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'currentColor' }}
            tickFormatter={(value) => value.toLocaleString()} />
          
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey="transactions"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorTransactions)"
            animationDuration={800} />
          
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>);

}
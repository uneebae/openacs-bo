import React from 'react';
import { TrendingUp, TrendingDown, BoxIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  icon: BoxIcon;
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  color: 'blue' | 'green' | 'red' | 'amber' | 'teal';
  sparklineData?: number[];
  index?: number;
}

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
};

const strokeColors = {
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  amber: '#F59E0B',
  teal: '#14B8A6'
};

export function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel = 'vs yesterday',
  color,
  sparklineData,
  index = 0
}: KpiCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft-lg border border-gray-200 dark:border-gray-700 transition-all hover:border-primary-300 dark:hover:border-primary-700"
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-3 rounded-lg ${colorClasses[color]} shadow-md`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.5} />
        </motion.div>
        
        {sparklineData && (
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.map((v, i) => ({ value: v, index: i }))}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={strokeColors[color]}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
            {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
            <span className={isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-gray-500'}>
              {isPositive && '+'}
              {trend}%
            </span>
            <span className="text-gray-400 dark:text-gray-500">{trendLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
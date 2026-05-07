import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TransactionsTimelineChart } from '../components/dashboard/TransactionsTimelineChart';
import { TransactionDistributionDonut } from '../components/dashboard/TransactionDistributionDonut';
import { AnalyticsWidgets } from '../components/dashboard/AnalyticsWidgets';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Zap,
  AlertCircle,
  Clock,
  TrendingUp,
  Timer
} from 'lucide-react';

const timelineData = [
  { time: '00:00', transactions: 1240 },
  { time: '03:00', transactions: 890 },
  { time: '06:00', transactions: 1560 },
  { time: '09:00', transactions: 3240 },
  { time: '12:00', transactions: 4180 },
  { time: '15:00', transactions: 3890 },
  { time: '18:00', transactions: 2760 },
  { time: '21:00', transactions: 2140 }
];

const distributionData = [
  { name: 'Frictionless', value: 15420, color: '#3B82F6' },
  { name: 'Challenge', value: 3280, color: '#14B8A6' },
  { name: 'Rejected', value: 1240, color: '#EF4444' }
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [dateRange, setDateRange] = useState('today');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time transaction authentication overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
            {['today', '7d', '30d'].map((range) => (
              <motion.button
                key={range}
                onClick={() => setDateRange(range)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  dateRange === range
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : '30 Days'}
              </motion.button>
            ))}
          </div>

          {/* Refresh Button */}
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 text-gray-600 dark:text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">Export</span>
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KpiCard
          icon={Activity}
          label="Total Transactions"
          value="19,940"
          trend={12.5}
          color="blue"
          sparklineData={[1200, 1400, 1300, 1600, 1800, 1700, 1940]}
          index={0}
        />
        <KpiCard
          icon={CheckCircle2}
          label="Approved"
          value="18,700"
          trend={8.2}
          color="green"
          sparklineData={[1100, 1300, 1250, 1500, 1700, 1650, 1870]}
          index={1}
        />
        <KpiCard
          icon={XCircle}
          label="Rejected"
          value="1,240"
          trend={-3.1}
          color="red"
          sparklineData={[150, 140, 130, 145, 135, 125, 124]}
          index={2}
        />
        <KpiCard
          icon={Zap}
          label="Frictionless"
          value="15,420"
          trend={15.3}
          color="blue"
          sparklineData={[900, 1100, 1050, 1300, 1450, 1400, 1542]}
          index={3}
        />
        <KpiCard
          icon={AlertCircle}
          label="Challenge"
          value="3,280"
          trend={-2.4}
          color="teal"
          sparklineData={[400, 380, 390, 370, 350, 340, 328]}
          index={4}
        />
        <KpiCard
          icon={Clock}
          label="Pending"
          value="156"
          trend={5.7}
          color="amber"
          sparklineData={[20, 18, 22, 19, 17, 16, 15]}
          index={5}
        />
        <KpiCard
          icon={TrendingUp}
          label="Success Rate"
          value="94.2%"
          trend={2.1}
          color="green"
          index={6}
        />
        <KpiCard
          icon={Timer}
          label="Avg Processing Time"
          value="142ms"
          trend={-5.3}
          color="blue"
          index={7}
        />
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionsTimelineChart data={timelineData} />
        </div>
        <div>
          <TransactionDistributionDonut data={distributionData} />
        </div>
      </div>

      {/* Analytics Widgets */}
      <AnalyticsWidgets />

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions onAction={handleQuickAction} />
        </div>
      </div>
    </motion.div>
  );
}
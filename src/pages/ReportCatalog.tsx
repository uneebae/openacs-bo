import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronRight,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  FileType,
  RotateCcw,
  Play,
  Calendar } from
'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
interface Report {
  id: string;
  name: string;
  description: string;
}
interface ReportCategory {
  id: string;
  name: string;
  reports: Report[];
}
const reportCategories: ReportCategory[] = [
{
  id: 'roles',
  name: 'Role Management',
  reports: [
  {
    id: 'roles-summary',
    name: 'Roles Summary Report',
    description: 'Overview of all roles by institution'
  },
  {
    id: 'roles-changes',
    name: 'Role Changes Audit',
    description: 'Track role modifications over time'
  }]

},
{
  id: 'users',
  name: 'User Management',
  reports: [
  {
    id: 'users-active',
    name: 'Active Users Report',
    description: 'List of currently active users'
  },
  {
    id: 'users-activity',
    name: 'User Activity Log',
    description: 'User login and action history'
  },
  {
    id: 'users-permissions',
    name: 'User Permissions Matrix',
    description: 'Permissions assigned per user'
  }]

},
{
  id: 'participants',
  name: 'Participant Management',
  reports: [
  {
    id: 'participants-list',
    name: 'Participants Directory',
    description: 'Complete participant directory export'
  },
  {
    id: 'participants-status',
    name: 'Participant Status Report',
    description: 'Active vs inactive participants'
  }]

},
{
  id: 'rules',
  name: 'Rule Engine',
  reports: [
  {
    id: 'rules-active',
    name: 'Active Rules Report',
    description: 'All currently active transaction rules'
  },
  {
    id: 'rules-bins',
    name: 'BIN Coverage Report',
    description: 'BINs configured per institution'
  }]

},
{
  id: 'mcc',
  name: 'MCC Block Management',
  reports: [
  {
    id: 'mcc-global',
    name: 'Global MCC Blocks',
    description: 'All globally blocked MCCs'
  },
  {
    id: 'mcc-participant',
    name: 'Participant MCC Blocks',
    description: 'MCC blocks per participant'
  }]

},
{
  id: 'country',
  name: 'Country Block Management',
  reports: [
  {
    id: 'country-global',
    name: 'Global Country Blocks',
    description: 'All globally blocked countries'
  },
  {
    id: 'country-participant',
    name: 'Participant Country Blocks',
    description: 'Country blocks per participant'
  }]

},
{
  id: 'auth',
  name: 'Authentication History',
  reports: [
  {
    id: 'auth-daily',
    name: 'Daily Authentication Report',
    description: 'Daily transaction authentication summary'
  },
  {
    id: 'auth-failures',
    name: 'Failed Authentications',
    description: 'All failed authentication attempts'
  },
  {
    id: 'auth-volumes',
    name: 'Transaction Volumes',
    description: 'Volume report by participant and merchant'
  }]

}];

export function ReportCatalog() {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
  'auth']
  );
  const [selectedReport, setSelectedReport] = useState<Report | null>(
    reportCategories[6].reports[0]
  );
  const [activeTab, setActiveTab] = useState<'filters' | 'preview' | 'export'>(
    'filters'
  );
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [institution, setInstitution] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
    prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const filteredCategories = reportCategories.
  map((cat) => ({
    ...cat,
    reports: cat.reports.filter(
      (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.name.toLowerCase().includes(search.toLowerCase())
    )
  })).
  filter((cat) => cat.reports.length > 0);
  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setInstitution('');
    setStatusValue('');
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.3
      }}>
      
      <PageHeader title="Report Catalog" breadcrumb="Home / Reports" />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Report Catalog Sidebar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 overflow-hidden h-fit lg:sticky lg:top-20">
          <div className="p-4 border-b border-border dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-600" />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-soft-bg dark:bg-gray-700 border border-transparent rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto py-2">
            {filteredCategories.length === 0 ?
            <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No reports found
              </div> :

            filteredCategories.map((category) => {
              const isExpanded =
              expandedCategories.includes(category.id) || search.length > 0;
              return (
                <div key={category.id} className="px-2">
                    <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-soft-bg dark:hover:bg-gray-700 transition-colors text-left">
                    
                      <span className="text-sm font-semibold text-navy dark:text-white">
                        {category.name}
                      </span>
                      {isExpanded ?
                    <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-600" /> :

                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
                    }
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded &&
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: 0.2
                      }}
                      className="overflow-hidden">
                      
                          <div className="pl-3 pb-1 space-y-0.5">
                            {category.reports.map((report) => {
                          const isSelected =
                          selectedReport?.id === report.id;
                          return (
                            <button
                              key={report.id}
                              onClick={() => setSelectedReport(report)}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${isSelected ? 'bg-primary-50 dark:bg-blue-900/20 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-soft-bg dark:hover:bg-gray-700'}`}>
                              
                                  <FileBarChart className="h-3.5 w-3.5 flex-shrink-0" />
                                  <span className="text-xs font-medium truncate">
                                    {report.name}
                                  </span>
                                </button>);

                        })}
                          </div>
                        </motion.div>
                    }
                    </AnimatePresence>
                  </div>);

            })
            }
          </div>
        </div>

        {/* Report Configuration Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 overflow-hidden">
          {selectedReport ?
          <>
              <div className="p-6 border-b border-border dark:border-gray-700">
                <h2 className="text-xl font-bold text-navy dark:text-white">
                  {selectedReport.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedReport.description}
                </p>
              </div>

              {/* Internal Tabs */}
              <div className="border-b border-border dark:border-gray-700 px-6">
                <div className="flex gap-1">
                  {(['filters', 'preview', 'export'] as const).map((tab) =>
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white'}`}>
                  
                      {tab}
                      {activeTab === tab &&
                  <motion.div
                    layoutId="reportTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }} />

                  }
                    </button>
                )}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'filters' &&
              <div className="space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy dark:text-white mb-2">
                          From Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-600 pointer-events-none" />
                          <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                      
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy dark:text-white mb-2">
                          To Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-600 pointer-events-none" />
                          <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                      
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy dark:text-white mb-2">
                        Institution
                      </label>
                      <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    
                        <option value="">All Institutions</option>
                        <option value="chase">Chase Bank</option>
                        <option value="wells">Wells Fargo</option>
                        <option value="boa">Bank of America</option>
                        <option value="citi">Citibank</option>
                        <option value="hsbc">HSBC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy dark:text-white mb-2">
                        Status
                      </label>
                      <select
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    
                        <option value="">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border dark:border-gray-700">
                      <button
                    onClick={() => setActiveTab('preview')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-sm">
                    
                        <Play className="h-4 w-4" />
                        Generate Report
                      </button>
                      <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-soft-bg dark:hover:bg-gray-600 transition-colors">
                    
                        <RotateCcw className="h-4 w-4" />
                        Reset Filters
                      </button>
                    </div>
                  </div>
              }

                {activeTab === 'preview' &&
              <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing first 5 rows of preview data
                      </p>
                      <button className="text-sm text-primary font-medium hover:text-primary-600">
                        Refresh Preview
                      </button>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-border dark:border-gray-700">
                      <table className="w-full">
                        <thead className="bg-soft-bg dark:bg-gray-700 border-b border-border dark:border-gray-600">
                          <tr>
                            {[
                        'Date',
                        'Transaction ID',
                        'Merchant',
                        'Amount',
                        'Status'].
                        map((h) =>
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          
                                {h}
                              </th>
                        )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-gray-700">
                          {[
                      {
                        date: '2024-02-14',
                        id: 'TXN-3F8K2L9',
                        merchant: 'Amazon.com',
                        amount: '$249.99',
                        status: 'Success'
                      },
                      {
                        date: '2024-02-14',
                        id: 'TXN-9K2M5P1',
                        merchant: 'Apple Store',
                        amount: '$1,299.00',
                        status: 'Success'
                      },
                      {
                        date: '2024-02-14',
                        id: 'TXN-7H4N8Q2',
                        merchant: 'Netflix',
                        amount: '$15.99',
                        status: 'Success'
                      },
                      {
                        date: '2024-02-14',
                        id: 'TXN-2L9P3R5',
                        merchant: 'Uber',
                        amount: '$32.50',
                        status: 'Failed'
                      },
                      {
                        date: '2024-02-14',
                        id: 'TXN-5T8V1W7',
                        merchant: 'Booking.com',
                        amount: '$845.00',
                        status: 'Success'
                      }].
                      map((row, i) =>
                      <tr
                        key={i}
                        className="hover:bg-soft-bg dark:hover:bg-gray-700 transition-colors">
                        
                              <td className="px-4 py-3 text-sm font-mono text-xs text-gray-600 dark:text-gray-400">
                                {row.date}
                              </td>
                              <td className="px-4 py-3 text-sm font-mono text-xs text-primary">
                                {row.id}
                              </td>
                              <td className="px-4 py-3 text-sm text-navy dark:text-white font-medium">
                                {row.merchant}
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold">
                                {row.amount}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${row.status === 'Success' ? 'bg-success-50 text-success' : 'bg-error-50 text-error'}`}>
                            
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                      )}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                      Full report contains an estimated 19,940 records.
                    </p>
                  </div>
              }

                {activeTab === 'export' &&
              <div className="max-w-2xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Choose your preferred export format. The report will be
                      generated using the filters configured.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                  {
                    format: 'XLSX',
                    icon: FileSpreadsheet,
                    color: 'text-success',
                    bg: 'bg-success-50',
                    desc: 'Excel spreadsheet'
                  },
                  {
                    format: 'PDF',
                    icon: FileType,
                    color: 'text-error',
                    bg: 'bg-error-50',
                    desc: 'Portable document'
                  },
                  {
                    format: 'CSV',
                    icon: FileText,
                    color: 'text-primary',
                    bg: 'bg-primary-50',
                    desc: 'Comma-separated'
                  }].
                  map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <motion.button
                        key={opt.format}
                        whileHover={{
                          y: -2
                        }}
                        whileTap={{
                          scale: 0.98
                        }}
                        className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-soft dark:hover:shadow-none transition-all">
                        
                            <div className={`p-3 rounded-lg ${opt.bg}`}>
                              <Icon className={`h-6 w-6 ${opt.color}`} />
                            </div>
                            <div className="text-center">
                              <div className="text-base font-semibold text-navy dark:text-white">
                                {opt.format}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {opt.desc}
                              </div>
                            </div>
                          </motion.button>);

                  })}
                    </div>
                  </div>
              }
              </div>
            </> :

          <EmptyState
            icon={FileBarChart}
            title="Select a report"
            description="Choose a report from the catalog to configure and generate" />

          }
        </div>
      </div>
    </motion.div>);

}
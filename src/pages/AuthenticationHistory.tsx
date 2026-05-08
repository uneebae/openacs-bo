import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, History, FileText, Database, RefreshCw } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ActionMenu } from '../components/common/ActionMenu';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/forms/Modal';
import { Button } from '../components/forms/Button';
import { generateAuthenticationExcel } from '../utils/generateAuthData';
import { getAuthTransactions } from '../services/firebaseService';
import { seedDataToFirebase } from '../utils/seedFirebaseData';

interface Transaction {
  id: number;
  dateTime: string;
  acsTransactionId: string;
  merchantName: string;
  cardHolder: string;
  cardNumber: string;
  amount: string;
  status: string;
  transactionType: string;
  scheme: string;
}

export function AuthenticationHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTxn, setSearchTxn] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');
  const [searchHolder, setSearchHolder] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLoadingFromFirebase, setIsLoadingFromFirebase] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadDataFromFirebase();
  }, []);

  const loadDataFromFirebase = async () => {
    setIsLoadingFromFirebase(true);
    try {
      console.log('📥 Loading transactions from Firebase...');
      // Load from Firebase
      const storageData = await getAuthTransactions();
      console.log(`✅ Loaded ${storageData.length} transactions from Firebase`);
      
      if (storageData.length === 0) {
        console.log('⚠️ No data in Firebase, showing empty state');
        setTransactions([]);
      } else {
        const transformedData: Transaction[] = (storageData as any).map((record: any, index: number) => {
          // Map 'Successful' → 'success', 'Failed' → 'failed', 'Rejected' → 'rejected'
          let normalizedStatus = 'failed';
          if (record.status === 'Successful') normalizedStatus = 'success';
          else if (record.status === 'Failed') normalizedStatus = 'failed';
          else if (record.status === 'Rejected') normalizedStatus = 'rejected';
          
          return {
            id: index + 1,
            dateTime: record.dateTime,
            acsTransactionId: record.acsTransactionId,
            merchantName: record.merchantName,
            cardHolder: record.cardHolder,
            cardNumber: record.cardNumber,
            amount: record.amount,
            status: normalizedStatus,
            transactionType: record.transactionType,
            scheme: record.scheme
          };
        });
        setTransactions(transformedData);
        console.log('✅ Transformed and loaded', transformedData.length, 'transactions');
      }
    } catch (error) {
      console.error('❌ Error loading from Firebase:', error);
      setTransactions([]);
    } finally {
      setIsLoadingFromFirebase(false);
    }
  };

  const handleSeedToFirebase = async () => {
    if (!window.confirm('This will load 10 sample transactions. Continue?')) {
      return;
    }
    
    setIsSeeding(true);
    console.log('🌱 Starting to seed sample data...');
    try {
      await seedDataToFirebase();
      console.log('✅ Seeding complete!');
      alert('✅ Sample data loaded successfully!');
      // Small delay then reload
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('🔄 Reloading data from storage...');
      await loadDataFromFirebase();
      console.log('✅ Data reloaded!');
      setIsSeeding(false);
    } catch (error) {
      console.error('❌ Error seeding data:', error);
      alert('❌ Error loading sample data. Check console (F12) for details.');
      setIsSeeding(false);
    }
  };

  // Download Excel file handler
  const handleDownloadExcel = () => {
    const blob = generateAuthenticationExcel();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'authentication_history.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // View transaction details handler
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  // Download receipt handler
  const handleDownloadReceipt = (transaction: Transaction) => {
    const receiptContent = `
AUTHENTICATION RECEIPT
═══════════════════════════════════════════
Date & Time: ${transaction.dateTime}
ACS Transaction ID: ${transaction.acsTransactionId}
═══════════════════════════════════════════

TRANSACTION DETAILS
Merchant Name: ${transaction.merchantName}
Card Holder: ${transaction.cardHolder}
Card Number: ${transaction.cardNumber}
Amount: ${transaction.amount}
Status: ${transaction.status.toUpperCase()}
Transaction Type: ${transaction.transactionType}
Card Scheme: ${transaction.scheme}

═══════════════════════════════════════════
Generated by Uneeb Ahmed - OCS System
${new Date().toLocaleString()}
═══════════════════════════════════════════
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${transaction.acsTransactionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const columns = [
  {
    key: 'dateTime',
    label: 'Date & Time',
    width: '180px',
    render: (dt: string) =>
    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{dt}</span>

  },
  {
    key: 'acsTransactionId',
    label: 'ACS Transaction ID',
    width: '180px',
    render: (id: string) =>
    <span className="font-mono text-xs font-medium text-blue-600 dark:text-blue-400">{id}</span>

  },
  {
    key: 'merchantName',
    label: 'Merchant Name',
    width: '180px',
    render: (name: string) =>
    <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>

  },
  {
    key: 'cardHolder',
    label: 'Card Holder',
    width: '170px'
  },
  {
    key: 'cardNumber',
    label: 'Card Number',
    width: '180px',
    render: (n: string) =>
    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{n}</span>

  },
  {
    key: 'amount',
    label: 'Amount',
    width: '120px',
    render: (a: string) =>
    <span className="font-semibold text-gray-800 dark:text-gray-200">{a}</span>

  },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (s: string) =>
    <StatusBadge status={s as 'success' | 'failed' | 'rejected'} />

  },
  {
    key: 'transactionType',
    label: 'Transaction Type',
    width: '140px',
    render: (type: string) =>
    <span className="text-sm text-gray-600 dark:text-gray-300">{type}</span>

  },
  {
    key: 'scheme',
    label: 'Scheme',
    width: '120px',
    render: (scheme: string) =>
    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{scheme}</span>

  },
  {
    key: 'action',
    label: 'Action',
    width: '80px',
    render: (_: any, row: Transaction) =>
    <ActionMenu
      actions={[
      {
        label: 'View Details',
        onClick: () => handleViewDetails(row),
        icon: <Eye className="h-4 w-4" />
      },
      {
        label: 'Download Receipt',
        onClick: () => handleDownloadReceipt(row),
        icon: <Download className="h-4 w-4" />
      }]
      } />


  }];

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
      
      <PageHeader
        title="Authentication History"
        breadcrumb="Home / Authentication History"
        primaryAction={{
          label: 'Download Excel',
          onClick: handleDownloadExcel
        }} />
      
      {/* Storage Controls */}
      <div className="mb-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Data Storage: <span className="text-blue-600 dark:text-blue-400">Firebase Cloud</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Connected to Firebase Firestore (Cloud Database)
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeedToFirebase}
            disabled={isSeeding}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <Database className="w-4 h-4" />
            {isSeeding ? 'Seeding...' : 'Load Sample Data'}
          </button>
          <button
            onClick={loadDataFromFirebase}
            disabled={isLoadingFromFirebase}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingFromFirebase ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
            Total Transactions
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{transactions.length}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">From storage</p>
        </div>
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600/50 transition-all shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Successful</p>
          <p className="text-3xl font-bold text-green-600 dark:text-emerald-400 mt-3">{transactions.filter(t => t.status === 'success').length}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{Math.round((transactions.filter(t => t.status === 'success').length / transactions.length) * 100)}% success rate</p>
        </div>
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600/50 transition-all shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Failed</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-3">{transactions.filter(t => t.status === 'failed').length}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{Math.round((transactions.filter(t => t.status === 'failed').length / transactions.length) * 100)}% of total</p>
        </div>
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600/50 transition-all shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Rejected</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-3">{transactions.filter(t => t.status === 'rejected').length}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{Math.round((transactions.filter(t => t.status === 'rejected').length / transactions.length) * 100)}% of total</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <FilterBar
          fields={[
          {
            type: 'search',
            placeholder: 'Search by transaction ID...',
            value: searchTxn,
            onChange: setSearchTxn
          },
          {
            type: 'search',
            placeholder: 'Search by merchant...',
            value: searchMerchant,
            onChange: setSearchMerchant
          },
          {
            type: 'search',
            placeholder: 'Search by card holder...',
            value: searchHolder,
            onChange: setSearchHolder
          },
          {
            type: 'select',
            placeholder: 'All Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
            {
              value: 'success',
              label: 'Success'
            },
            {
              value: 'failed',
              label: 'Failed'
            },
            {
              value: 'rejected',
              label: 'Rejected'
            }]

          }]
          } />
        
        <DataTable
          columns={columns}
          data={transactions}
          emptyState={
          <EmptyState
            icon={History}
            title="No authentication history"
            description="Transaction authentication records will appear here" />

          } />
        
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          pageSize={pageSize}
          totalItems={transactions.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize} />
        
      </div>

      {/* Transaction Details Modal */}
      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
        size="lg"
      >
        {selectedTransaction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-lg border border-primary-200 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Transaction ID</p>
                    <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">{selectedTransaction.acsTransactionId}</p>
                  </div>
                </div>
                <StatusBadge status={selectedTransaction.status as 'success' | 'failed' | 'rejected'} />
              </div>
            </div>

            {/* Transaction Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Date & Time</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedTransaction.dateTime}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Card Scheme</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedTransaction.scheme}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Merchant Name</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedTransaction.merchantName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Transaction Type</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedTransaction.transactionType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Card Holder</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedTransaction.cardHolder}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Amount</p>
                <p className="text-sm font-bold text-primary-600 dark:text-blue-400 mt-1">{selectedTransaction.amount}</p>
              </div>
            </div>

            {/* Card Details Section */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Card Details</p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  <span className="text-gray-500 dark:text-gray-400">Card Number:</span>
                  <span className="font-mono ml-2">{selectedTransaction.cardNumber}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setSelectedTransaction(null)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleDownloadReceipt(selectedTransaction);
                  setSelectedTransaction(null);
                }}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>
    </motion.div>);

}
// Local storage service - replaces Firebase for faster, offline-capable storage

export interface AuthTransaction {
  dateTime: string;
  acsTransactionId: string;
  merchantName: string;
  cardHolder: string;
  cardNumber: string;
  amount: string;
  status: 'Successful' | 'Failed' | 'Rejected';
  transactionType: string;
  scheme: string;
}

const STORAGE_KEY = 'openacs_transactions';

// Add a new transaction to localStorage
export const addAuthTransaction = async (transaction: AuthTransaction): Promise<string> => {
  try {
    const transactions = getStoredTransactions();
    const id = `ACS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    transactions.unshift({ ...transaction, id });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Get all transactions from localStorage
export const getAuthTransactions = async (): Promise<AuthTransaction[]> => {
  try {
    return getStoredTransactions();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

// Helper function to get stored transactions
const getStoredTransactions = (): AuthTransaction[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Seed initial data to localStorage
export const seedInitialData = async (transactions: AuthTransaction[]): Promise<void> => {
  try {
    console.log(`Starting to seed ${transactions.length} transactions...`);
    
    const stored = getStoredTransactions();
    const combined = [...transactions, ...stored];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    
    console.log(`✅ All ${transactions.length} transactions seeded successfully!`);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
};

// Clear all transactions (for testing)
export const clearAllTransactions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Get transaction statistics
export const getTransactionStats = async () => {
  try {
    const transactions = await getAuthTransactions();
    
    const total = transactions.length;
    const successful = transactions.filter(t => t.status === 'Successful').length;
    const failed = transactions.filter(t => t.status === 'Failed').length;
    const rejected = transactions.filter(t => t.status === 'Rejected').length;
    
    return {
      total,
      successful,
      successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : '0',
      failed,
      failRate: total > 0 ? ((failed / total) * 100).toFixed(1) : '0',
      rejected,
      rejectRate: total > 0 ? ((rejected / total) * 100).toFixed(1) : '0',
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    throw error;
  }
};

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../config/firebase';

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
  timestamp?: Timestamp;
}

const TRANSACTIONS_COLLECTION = 'authTransactions';

// Add a new transaction to Firebase
export const addAuthTransaction = async (transaction: Omit<AuthTransaction, 'timestamp'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), {
      ...transaction,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

// Get all transactions from Firebase - Optimized query
export const getAuthTransactions = async (): Promise<AuthTransaction[]> => {
  try {
    // Simple query without orderBy for faster retrieval
    const q = query(collection(db, TRANSACTIONS_COLLECTION));
    
    const querySnapshot = await getDocs(q);
    const transactions: AuthTransaction[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      transactions.push({
        dateTime: data.dateTime,
        acsTransactionId: data.acsTransactionId,
        merchantName: data.merchantName,
        cardHolder: data.cardHolder,
        cardNumber: data.cardNumber,
        amount: data.amount,
        status: data.status,
        transactionType: data.transactionType,
        scheme: data.scheme,
        timestamp: data.timestamp,
      });
    });
    
    // Sort locally by timestamp descending (faster than Firebase orderBy)
    transactions.sort((a, b) => {
      const timeA = a.timestamp ? a.timestamp.toMillis() : 0;
      const timeB = b.timestamp ? b.timestamp.toMillis() : 0;
      return timeB - timeA;
    });
    
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Seed initial data to Firebase - Optimized batch writes
export const seedInitialData = async (transactions: Omit<AuthTransaction, 'timestamp'>[]): Promise<void> => {
  try {
    console.log(`Starting to seed ${transactions.length} transactions...`);
    
    // Batch writes in groups of 3 for optimal performance
    const batchSize = 3;
    for (let i = 0; i < transactions.length; i += batchSize) {
      const batch = transactions.slice(i, i + batchSize);
      const promises = batch.map(transaction => addAuthTransaction(transaction));
      await Promise.all(promises);
      const completed = Math.min(i + batchSize, transactions.length);
      console.log(`✅ Seeded ${completed}/${transactions.length} records`);
    }
    
    console.log(`✅ All ${transactions.length} transactions seeded successfully!`);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
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

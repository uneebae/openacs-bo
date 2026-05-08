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

// Get all transactions from Firebase
export const getAuthTransactions = async (): Promise<AuthTransaction[]> => {
  try {
    const q = query(
      collection(db, TRANSACTIONS_COLLECTION),
      orderBy('timestamp', 'desc')
    );
    
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
    
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Seed initial data to Firebase (from existing mock data)
export const seedInitialData = async (transactions: Omit<AuthTransaction, 'timestamp'>[]): Promise<void> => {
  try {
    const promises = transactions.map(transaction => addAuthTransaction(transaction));
    await Promise.all(promises);
    console.log(`Successfully seeded ${transactions.length} transactions to Firebase`);
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

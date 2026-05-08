import { loadAuthenticationData } from './generateAuthData';
import { seedInitialData, AuthTransaction } from '../services/firebaseService';

// Convert authentication records to Firebase format
export const convertToStorageFormat = (records: any[]): Omit<AuthTransaction, 'timestamp'>[] => {
  return records.map(record => ({
    dateTime: record['Date & Time'],
    acsTransactionId: record['ACS Transaction ID'],
    merchantName: record['Merchant Name'],
    cardHolder: record['Card Holder'],
    cardNumber: record['Card Number'],
    amount: record['Amount'],
    status: record['Status'] === 'Success' ? 'Successful' : record['Status'] as 'Successful' | 'Failed' | 'Rejected',
    transactionType: record['Transaction Type'],
    scheme: record['Scheme'],
  }));
};

// Seed data to Firebase
export const seedDataToFirebase = async (): Promise<void> => {
  try {
    console.log('📂 Loading authentication data...');
    const authData = loadAuthenticationData();
    console.log(`✅ Loaded ${authData.length} records`);
    
    console.log('🔄 Converting to Firebase format...');
    const firebaseData = convertToStorageFormat(authData);
    console.log(`✅ Converted ${firebaseData.length} records`);
    
    console.log('💾 Seeding to Firebase...');
    await seedInitialData(firebaseData);
    
    console.log('✅ Data successfully seeded to Firebase!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
};

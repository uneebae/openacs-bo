import { loadAuthenticationData } from './generateAuthData';
import { seedInitialData, AuthTransaction } from '../services/storageService';

// Convert authentication records to Storage format
export const convertToStorageFormat = (records: any[]): AuthTransaction[] => {
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

// Seed data to localStorage
export const seedDataToFirebase = async (): Promise<void> => {
  try {
    console.log('📂 Loading authentication data...');
    const authData = loadAuthenticationData();
    console.log(`✅ Loaded ${authData.length} records`);
    
    console.log('🔄 Converting to storage format...');
    const storageData = convertToStorageFormat(authData);
    console.log(`✅ Converted ${storageData.length} records`);
    
    console.log('💾 Seeding to localStorage...');
    await seedInitialData(storageData);
    
    console.log('✅ Data successfully seeded to localStorage!');
    console.log('📊 Current storage contents:', localStorage.getItem('openacs_transactions'));
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
};

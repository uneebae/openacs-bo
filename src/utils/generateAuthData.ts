import * as XLSX from 'xlsx';

export interface AuthenticationRecord {
  'Date & Time': string;
  'ACS Transaction ID': string;
  'Merchant Name': string;
  'Card Holder': string;
  'Card Number': string;
  'Amount': string;
  'Status': string;
  'Transaction Type': string;
  'Scheme': string;
  'Action': string;
}

// Generate Excel file with authentication data
export function generateAuthenticationExcel() {
  const data: AuthenticationRecord[] = [
    {
      'Date & Time': '2024-02-14 14:32:18',
      'ACS Transaction ID': 'ACS-2024-A8F3D2',
      'Merchant Name': 'Amazon.com',
      'Card Holder': 'John Anderson',
      'Card Number': '4123 **** **** 8842',
      'Amount': '$249.99',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 14:28:55',
      'ACS Transaction ID': 'ACS-2024-B9E4F1',
      'Merchant Name': 'Apple Store',
      'Card Holder': 'Sarah Chen',
      'Card Number': '5512 **** **** 4421',
      'Amount': '$1,299.00',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 14:15:42',
      'ACS Transaction ID': 'ACS-2024-C1A5B3',
      'Merchant Name': 'Netflix',
      'Card Holder': 'Mike Johnson',
      'Card Number': '4221 **** **** 9931',
      'Amount': '$15.99',
      'Status': 'Success',
      'Transaction Type': 'Subscription',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:58:11',
      'ACS Transaction ID': 'ACS-2024-D2B6C4',
      'Merchant Name': 'Uber',
      'Card Holder': 'Emily Williams',
      'Card Number': '5142 **** **** 1287',
      'Amount': '$32.50',
      'Status': 'Failed',
      'Transaction Type': 'Payment',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:45:07',
      'ACS Transaction ID': 'ACS-2024-E3C7D5',
      'Merchant Name': 'Booking.com',
      'Card Holder': 'Robert Brown',
      'Card Number': '4509 **** **** 6614',
      'Amount': '$845.00',
      'Status': 'Success',
      'Transaction Type': 'Booking',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:30:22',
      'ACS Transaction ID': 'ACS-2024-F4D8E6',
      'Merchant Name': 'Steam',
      'Card Holder': 'David Miller',
      'Card Number': '5298 **** **** 3325',
      'Amount': '$59.99',
      'Status': 'Rejected',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:15:03',
      'ACS Transaction ID': 'ACS-2024-G5E9F7',
      'Merchant Name': 'Spotify',
      'Card Holder': 'Lisa Garcia',
      'Card Number': '4731 **** **** 7782',
      'Amount': '$9.99',
      'Status': 'Success',
      'Transaction Type': 'Subscription',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:55:48',
      'ACS Transaction ID': 'ACS-2024-H6F0G8',
      'Merchant Name': 'Walmart',
      'Card Holder': 'James Wilson',
      'Card Number': '5547 **** **** 2218',
      'Amount': '$127.45',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:40:33',
      'ACS Transaction ID': 'ACS-2024-I7G1H9',
      'Merchant Name': 'Target',
      'Card Holder': 'Maria Rodriguez',
      'Card Number': '4876 **** **** 5543',
      'Amount': '$89.95',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:25:17',
      'ACS Transaction ID': 'ACS-2024-J8H2I0',
      'Merchant Name': 'Best Buy',
      'Card Holder': 'Thomas White',
      'Card Number': '5634 **** **** 7789',
      'Amount': '$599.99',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    }
  ];

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Authentication History');
  
  // Generate Excel file buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

// Parse Excel file and return data
export async function parseAuthenticationExcel(file: File | Blob): Promise<AuthenticationRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json<AuthenticationRecord>(worksheet);
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

// Load authentication data (returns the generated data directly)
export function loadAuthenticationData(): AuthenticationRecord[] {
  return [
    {
      'Date & Time': '2024-02-14 14:32:18',
      'ACS Transaction ID': 'ACS-2024-A8F3D2',
      'Merchant Name': 'Amazon.com',
      'Card Holder': 'John Anderson',
      'Card Number': '4123 **** **** 8842',
      'Amount': '$249.99',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 14:28:55',
      'ACS Transaction ID': 'ACS-2024-B9E4F1',
      'Merchant Name': 'Apple Store',
      'Card Holder': 'Sarah Chen',
      'Card Number': '5512 **** **** 4421',
      'Amount': '$1,299.00',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 14:15:42',
      'ACS Transaction ID': 'ACS-2024-C1A5B3',
      'Merchant Name': 'Netflix',
      'Card Holder': 'Mike Johnson',
      'Card Number': '4221 **** **** 9931',
      'Amount': '$15.99',
      'Status': 'Success',
      'Transaction Type': 'Subscription',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:58:11',
      'ACS Transaction ID': 'ACS-2024-D2B6C4',
      'Merchant Name': 'Uber',
      'Card Holder': 'Emily Williams',
      'Card Number': '5142 **** **** 1287',
      'Amount': '$32.50',
      'Status': 'Failed',
      'Transaction Type': 'Payment',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:45:07',
      'ACS Transaction ID': 'ACS-2024-E3C7D5',
      'Merchant Name': 'Booking.com',
      'Card Holder': 'Robert Brown',
      'Card Number': '4509 **** **** 6614',
      'Amount': '$845.00',
      'Status': 'Success',
      'Transaction Type': 'Booking',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:30:22',
      'ACS Transaction ID': 'ACS-2024-F4D8E6',
      'Merchant Name': 'Steam',
      'Card Holder': 'David Miller',
      'Card Number': '5298 **** **** 3325',
      'Amount': '$59.99',
      'Status': 'Rejected',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 13:15:03',
      'ACS Transaction ID': 'ACS-2024-G5E9F7',
      'Merchant Name': 'Spotify',
      'Card Holder': 'Lisa Garcia',
      'Card Number': '4731 **** **** 7782',
      'Amount': '$9.99',
      'Status': 'Success',
      'Transaction Type': 'Subscription',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:55:48',
      'ACS Transaction ID': 'ACS-2024-H6F0G8',
      'Merchant Name': 'Walmart',
      'Card Holder': 'James Wilson',
      'Card Number': '5547 **** **** 2218',
      'Amount': '$127.45',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:40:33',
      'ACS Transaction ID': 'ACS-2024-I7G1H9',
      'Merchant Name': 'Target',
      'Card Holder': 'Maria Rodriguez',
      'Card Number': '4876 **** **** 5543',
      'Amount': '$89.95',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Visa',
      'Action': 'View Details'
    },
    {
      'Date & Time': '2024-02-14 12:25:17',
      'ACS Transaction ID': 'ACS-2024-J8H2I0',
      'Merchant Name': 'Best Buy',
      'Card Holder': 'Thomas White',
      'Card Number': '5634 **** **** 7789',
      'Amount': '$599.99',
      'Status': 'Success',
      'Transaction Type': 'Purchase',
      'Scheme': 'Mastercard',
      'Action': 'View Details'
    }
  ];
}

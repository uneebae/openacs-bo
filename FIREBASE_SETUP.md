# Firebase Setup Guide

This guide will help you set up Firebase for the OpenACS Back Office application to enable real-time transaction storage and retrieval.

## Prerequisites

- A Google account
- Node.js and npm installed
- Firebase CLI (optional, for advanced features)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a Project"
3. Enter project name (e.g., "openacs-backoffice")
4. Enable or disable Google Analytics (your choice)
5. Click "Create Project"

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "OpenACS Web App")
3. **DO NOT** check "Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Configure Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose:
   - **Production mode** (for secure rules)
   - **Test mode** (for development - rules allow read/write for 30 days)
4. Select your preferred location (closest to your users)
5. Click "Enable"

## Step 4: Update Firebase Config

1. Open `src/config/firebase.ts` in your project
2. Replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Set Up Firestore Security Rules

In Firestore, go to **Rules** and update the security rules:

### For Development (Testing):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### For Production (Secure):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /authTransactions/{transactionId} {
      // Allow authenticated users to read
      allow read: if request.auth != null;
      // Allow authenticated users to write
      allow create: if request.auth != null;
      // Prevent modification of existing transactions
      allow update, delete: if false;
    }
  }
}
```

## Step 6: Seed Initial Data

Once your Firebase is configured:

1. Start your application: `npm run dev`
2. Navigate to **Authentication History** page
3. You'll see a "Data Source: Local Mock Data" banner
4. Click **"Seed to Firebase"** button
5. Confirm the action
6. Wait for success message
7. Data source will automatically switch to "Firebase Realtime"

## Complete Transaction Flow

### 1. **Checkout Page** (`/checkout`)
- Browse products in cart
- Adjust quantities
- View order summary
- Click "Proceed to Payment"

### 2. **Payment Gateway** 
- Enter card details:
  - Card Number (detects Visa/Mastercard)
  - Card Holder Name
  - Expiry Date (MM/YY)
  - CVV
  - Billing Address
- Click "Pay $XXX.XX"

### 3. **ACS Authentication** (3D Secure)
- Choose OTP delivery method (SMS/Email/In-App)
- View demo OTP code on screen
- Enter 6-digit OTP
  - Use displayed code or **"123456"** for demo
- Click "Verify & Complete Payment"

### 4. **Transaction Saved to Firebase**
- On successful OTP verification
- Transaction data automatically saved to Firestore
- Includes:
  - Date & Time
  - ACS Transaction ID
  - Merchant Name
  - Card Holder
  - Masked Card Number
  - Amount
  - Status (Successful)
  - Transaction Type
  - Card Scheme

### 5. **View in Authentication History**
- Navigate to **Authentication History**
- See all transactions from Firebase
- Click **"Refresh"** to reload latest data
- Use filters to search transactions
- View details or download receipts

## Firebase Collections Structure

### Collection: `authTransactions`

Each document contains:
```typescript
{
  dateTime: string,          // "2024-02-14 14:32:18"
  acsTransactionId: string,  // "ACS-2024-A8F3D2"
  merchantName: string,      // "Amazon.com"
  cardHolder: string,        // "John Doe"
  cardNumber: string,        // "4123 **** **** 8842"
  amount: string,            // "$249.99"
  status: string,            // "Successful" | "Failed" | "Rejected"
  transactionType: string,   // "Purchase" | "Subscription" | "Booking"
  scheme: string,            // "Visa" | "Mastercard"
  timestamp: Timestamp       // Firebase server timestamp
}
```

## Features Enabled by Firebase

✅ **Real-time Data Sync** - Transactions appear instantly across all devices
✅ **Persistent Storage** - Data survives page refreshes and app restarts
✅ **Automatic Timestamps** - Server-side timestamp for consistency
✅ **Query & Filter** - Search by transaction ID, merchant, card holder, status
✅ **Statistics** - Real-time KPIs (Total, Success Rate, Failed, Rejected)
✅ **Export** - Download transaction data as Excel files
✅ **Scalability** - Handles growing transaction volumes automatically

## Troubleshooting

### Issue: "Permission Denied" Error
**Solution:** Update Firestore security rules to allow read/write access

### Issue: "Firebase not initialized"
**Solution:** Verify `firebase.ts` config has your actual project credentials

### Issue: "Seed button not working"
**Solution:** Check browser console for errors, ensure Firebase is properly configured

### Issue: "Data not appearing"
**Solution:** Click "Refresh" button or check Firestore Console to verify data exists

## Environment Variables (Optional)

For better security, use environment variables:

1. Create `.env` file in project root:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

3. Add `.env` to `.gitignore`

## Testing the Complete Flow

1. **Login** with credentials: `uneeb_ahmed` / `admin123`
2. Navigate to **"Demo Checkout"** from sidebar
3. Review cart items, adjust quantities
4. Click **"Proceed to Payment"**
5. Fill in payment details (any valid format)
6. Click **"Pay"**
7. On ACS screen, use OTP: **"123456"** or displayed code
8. Click **"Verify & Complete Payment"**
9. See success message
10. Go to **"Authentication History"**
11. See your new transaction at the top!

## Next Steps

- **Add Authentication:** Integrate Firebase Authentication for user management
- **Add Realtime Listeners:** Update UI automatically when data changes
- **Add Analytics:** Track transaction success rates and patterns
- **Add Cloud Functions:** Server-side validation and webhooks
- **Add Storage:** Store transaction receipts as PDF files

---

**Need Help?** Check Firebase documentation at https://firebase.google.com/docs

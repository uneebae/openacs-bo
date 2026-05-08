# OpenACS - Back Office Portal

A professional **Access Control Server (ACS) Back Office** management system built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive admin interface for managing 3D Secure authentication, participants, card schemes, and transaction monitoring.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.2-purple?logo=vite)

## Features

### 🛒 E-Commerce Flow with Firebase Integration

**Complete end-to-end transaction flow:**
1. **Demo Checkout** — Shopping cart with product management and quantity controls
2. **Payment Gateway** — Card details entry with real-time scheme detection (Visa/Mastercard)
3. **3D Secure (ACS)** — OTP verification with SMS/Email/In-App options
4. **Firebase Storage** — Automatic transaction saving to Firestore database
5. **Real-time Sync** — Transactions appear instantly in Authentication History

**Firebase Features:**
- ✅ Real-time data synchronization across devices
- ✅ Persistent storage with server-side timestamps
- ✅ One-click seeding of initial demo data
- ✅ Automatic refresh and live updates
- ✅ Secure transaction records with Firestore

📖 **[Complete Firebase Setup Guide →](FIREBASE_SETUP.md)**

### Core Modules

- **Dashboard** — Real-time KPIs, transaction timeline charts, distribution donuts, and quick actions
- **Demo Checkout** — Full e-commerce cart with payment gateway and ACS authentication flow
- **Participant Management** — 4-step wizard for onboarding with BIN configuration, OTP setup, and ACS page customization with live phone mockup preview
- **Authentication History** — Transaction monitoring with Firebase integration, Excel export/import, receipt downloads, and detailed view modals
- **Rule Engine Management** — Configure authentication rules and fraud detection logic
- **MCC Block Management** — Global and participant-level MCC blocking with maker-checker inbox
- **Country Block Management** — Geographic transaction restrictions
- **Card Status Management** — Card lifecycle and status tracking
- **API Configuration** — API endpoint management for participants
- **Role Management** — Role-based access control with permission matrices
- **User Management** — User administration with inbox workflow
- **Report Catalog** — Report generation with filters and export capabilities
- **Module Directory** — Application menu and module overview

### UI/UX Highlights

- **Dark & Light Mode** — Full dual-theme support with smooth transitions and localStorage persistence
- **Responsive Design** — Mobile-first approach with collapsible sidebar
- **Professional Animations** — Framer Motion page transitions, hover effects, and staggered loading
- **Form Components** — Complete library (Input, Select, Button, Modal, Textarea, Switch, Checkbox, FileUpload)
- **Live Previews** — Real-time phone mockup for ACS customization, SMS/Email previews for OTP configuration
- **Excel Integration** — Generate, download, and parse authentication data via XLSX

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18.3 | UI Framework |
| TypeScript | Type Safety |
| Vite 5.2 | Build Tool & Dev Server |
| Tailwind CSS 3.4 | Utility-First Styling |
| Framer Motion 11.5 | Animations |
| Recharts 2.12 | Charts & Visualizations |
| Lucide React | Icons |
| XLSX | Excel File Handling |
| **Firebase** | **Realtime Database & Storage** |

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Firebase account (for transaction storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/uneebae/openacs-bo.git
cd openacs-bo

# Install dependencies
npm install

# Configure Firebase (see FIREBASE_SETUP.md for detailed instructions)
# 1. Create Firebase project at https://console.firebase.google.com
# 2. Enable Firestore Database
# 3. Copy your config to src/config/firebase.ts

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Quick Start (Without Firebase)

The app works with mock data by default. To use Firebase features:
1. Follow [Firebase Setup Guide](FIREBASE_SETUP.md)
2. Click "Seed to Firebase" in Authentication History
3. Complete a transaction via Demo Checkout

### Login Credentials

- **Username:** `uneeb_ahmed`
- **Password:** `admin123`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── checkout/      # E-commerce flow (PaymentGateway, ACSAuthentication)
│   ├── common/        # Reusable UI (DataTable, Pagination, FilterBar, StatusBadge, etc.)
│   ├── dashboard/     # Dashboard widgets (KPI cards, charts, activity feeds)
│   ├── forms/         # Form components (Input, Select, Modal, Switch, etc.)
│   └── layout/        # App shell, Sidebar, Topbar
├── config/            # Firebase configuration
├── context/           # ThemeContext for dark/light mode
├── pages/             # All application pages/screens (incl. Checkout)
├── services/          # Firebase service layer (Firestore operations)
├── utils/             # Utilities (Excel data generation, Firebase seeding)
├── App.tsx            # Root component with routing
└── index.tsx          # Entry point
```

## Screenshots

### Dark Mode
- Professional dark interface with glassmorphic cards and gradient accents
- Smooth transitions between light and dark themes

### Light Mode
- Clean, modern light interface with proper shadows and borders
- High contrast readability

## Configuration

### Theme Customization

The theme system uses CSS variables defined in `src/index.css` and extended Tailwind config in `tailwind.config.js`:

- Semantic color utilities (`app-light`, `app-dark`, `surface-*`)
- Dark-mode specific shadows (`dark-sm`, `dark-md`)
- Custom animations and transitions

### Card Schemes Supported

- Visa
- Mastercard
- American Express
- UnionPay

## Author

**Uneeb Ahmed**

## License

This project is proprietary software. All rights reserved.

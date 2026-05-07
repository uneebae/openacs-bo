import React, { useState } from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ModuleDirectory } from './pages/ModuleDirectory';
import { RoleManagement } from './pages/RoleManagement';
import { UserManagement } from './pages/UserManagement';
import { ParticipantManagement } from './pages/ParticipantManagement';
import { RuleEngineManagement } from './pages/RuleEngineManagement';
import { MccBlockManagement } from './pages/MccBlockManagement';
import { CountryBlockManagement } from './pages/CountryBlockManagement';
import { ApiConfigManagement } from './pages/ApiConfigManagement';
import { AuthenticationHistory } from './pages/AuthenticationHistory';
import { CardStatusManagement } from './pages/CardStatusManagement';
import { ReportCatalog } from './pages/ReportCatalog';
import { AppShell } from './components/layout/AppShell';
import { CreditCard, FileBarChart } from 'lucide-react';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'modules':
        return <ModuleDirectory />;
      case 'roles':
        return <RoleManagement />;
      case 'users':
        return <UserManagement />;
      case 'participants':
        return <ParticipantManagement />;
      case 'rules':
        return <RuleEngineManagement />;
      case 'mcc':
        return <MccBlockManagement />;
      case 'country':
        return <CountryBlockManagement />;
      case 'api':
        return <ApiConfigManagement />;
      case 'auth-history':
        return <AuthenticationHistory />;
      case 'card-status':
        return <CardStatusManagement />;
      case 'reports':
        return <ReportCatalog />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };
  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AppShell>);

}
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InventoryDashboard } from './components/InventoryDashboard';
import { AssetList } from './components/AssetList';
import { LicenseList } from './components/LicenseList';
import { EmployeeList } from './components/EmployeeList';
import { MaintenanceList } from './components/MaintenanceList';
import { UserManagement } from './components/UserManagement';
import { SystemAudit } from './components/SystemAudit';
import { LoginPage } from './components/LoginPage';
import { MyAssets } from './components/MyAssets';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 print:block print:bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col print:block">
        <Header />
        <main className="p-8 flex-1 overflow-y-auto print:p-0 print:overflow-visible print:static">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Routes>
                <Route path="/" element={<InventoryDashboard />} />
                <Route path="/assets" element={<AssetList />} />
                <Route path="/licenses" element={<LicenseList />} />
                <Route path="/maintenance" element={<MaintenanceList />} />
                <Route path="/assignments" element={<EmployeeList />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/audit" element={<SystemAudit />} />
                <Route path="/my-assets" element={<MyAssets />} />
              </Routes>
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

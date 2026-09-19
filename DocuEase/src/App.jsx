import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { Features } from './pages/public/Features';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';

// Auth Pages
import { Onboarding } from './pages/auth/Onboarding';
import { BusinessSelector } from './pages/auth/BusinessSelector';
import { Dashboard } from './pages/auth/Dashboard';
import { ComplianceCenter } from './pages/auth/ComplianceCenter';
import { DocumentVault } from './pages/auth/DocumentVault';
import { Scanner } from './pages/auth/Scanner';
import { Professionals } from './pages/auth/Professionals';
import { HireProfessional } from './pages/auth/HireProfessional';
import { Checkout } from './pages/auth/Checkout';
import { Workspace } from './pages/auth/Workspace';
import { Notices } from './pages/auth/Notices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/businesses" element={<BusinessSelector />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compliance" element={<ComplianceCenter />} />
            <Route path="/hire/:id" element={<HireProfessional />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/workspace/:id" element={<Workspace />} />
            <Route path="/documents" element={<DocumentVault />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/notices" element={<Notices />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

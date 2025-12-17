import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import AdminDashboard from './pages/AdminDashboard';
import Subscription from './pages/Subscription';

// Layout Wrapper to conditionally show Navigation
const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const location = useLocation();
  const hideNavPaths = ['/login', '/onboarding', '/admin', '/subscription'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="h-full w-full max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden">
      <div className="w-full h-full">
        {children}
      </div>
      {showNav && <Navigation />}
    </div>
  );
};

// Guard component to protect routes
// requirePremium: If true, blocks access for users with 'expired' subscription
const ProtectedRoute: React.FC<{ children: React.ReactNode; requirePremium?: boolean }> = ({ children, requirePremium = false }) => {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If route requires premium and subscription is expired, redirect to paywall
  if (requirePremium && user?.subscriptionStatus === 'expired') {
     return <Navigate to="/subscription" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/subscription" element={<Subscription />} />
        
        {/* Protected Routes */}
        {/* Dashboard and FoodLog require Premium/Trial */}
        <Route path="/" element={<ProtectedRoute requirePremium={true}><Dashboard /></ProtectedRoute>} />
        <Route path="/food" element={<ProtectedRoute requirePremium={true}><FoodLog /></ProtectedRoute>} />
        
        {/* Workouts and Profile are available for Free users too */}
        <Route path="/workout" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
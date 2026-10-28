import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import AccountOverview from './pages/AccountOverview.jsx';
import PaymentActivity from './pages/PaymentActivity.jsx';
import Profile from './pages/Profile.jsx';
import SecurityStatus from './pages/SecurityStatus.jsx';
import AccessDenied from './pages/AccessDenied.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountOverview />} />
          <Route path="activity" element={<PaymentActivity />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<SecurityStatus />} />
        </Route>

        {/* Customer accounts have no authorization to reach admin tooling.
            This route always renders Access Denied to demonstrate that
            authorization boundary, even for an authenticated customer. */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AccessDenied />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

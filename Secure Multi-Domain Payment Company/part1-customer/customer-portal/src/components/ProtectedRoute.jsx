import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Demonstrates route-level authorization only. In a real application this
// check must also be enforced server-side — a client-side guard like this
// can always be bypassed by a motivated user.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

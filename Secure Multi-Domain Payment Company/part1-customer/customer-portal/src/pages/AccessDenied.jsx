import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <ShieldOff className="h-8 w-8 text-danger" strokeWidth={2} />
      <h1 className="mt-4 font-display text-xl font-semibold text-ink">Access denied</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        You do not have permission to access this resource. Customer accounts
        cannot reach administrative tooling in this prototype.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-trust"
      >
        Back to dashboard
      </Link>
    </div>
  );
}

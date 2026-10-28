import { TimerReset } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function SessionBadge() {
  const { secondsLeft, sessionSeconds, extendSession } = useAuth();
  const isLow = secondsLeft <= 60;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${
        isLow ? 'border-alert/40 bg-alert-tint text-alert' : 'border-line bg-white text-muted'
      }`}
    >
      <TimerReset className="h-3.5 w-3.5" strokeWidth={2} />
      <span>
        Session active · expires in{' '}
        <span className="font-mono tabular-nums text-ink">{formatTime(secondsLeft)}</span>
      </span>
      {isLow && (
        <button
          type="button"
          onClick={extendSession}
          className="ml-1 rounded border border-alert/40 px-2 py-0.5 font-medium text-alert hover:bg-alert/10"
        >
          Extend
        </button>
      )}
      <span className="sr-only">Session length is simulated at {sessionSeconds} seconds for this demonstration.</span>
    </div>
  );
}

const steps = ['Details', 'Confirm', 'Done'];

export default function StepIndicator({ current }) {
  return (
    <ol className="flex items-center gap-3">
      {steps.map((label, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === current;
        const isComplete = stepNumber < current;
        return (
          <li key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs ${
                  isActive
                    ? 'bg-trust text-white'
                    : isComplete
                      ? 'bg-secure text-white'
                      : 'border border-line bg-white text-muted'
                }`}
              >
                {stepNumber}
              </span>
              <span className={`text-sm ${isActive ? 'text-ink font-medium' : 'text-muted'}`}>{label}</span>
            </div>
            {stepNumber !== steps.length && <span className="h-px w-8 bg-line" />}
          </li>
        );
      })}
    </ol>
  );
}

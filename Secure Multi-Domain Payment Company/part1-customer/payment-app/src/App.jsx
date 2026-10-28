import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import StepIndicator from './components/StepIndicator.jsx';
import PaymentForm from './components/PaymentForm.jsx';
import ConfirmationScreen from './components/ConfirmationScreen.jsx';
import SuccessScreen from './components/SuccessScreen.jsx';
import SecurityNote from './components/SecurityNote.jsx';
import { generateDemoTransactionId, initialPaymentForm } from './data/demoData.js';

const CUSTOMER_PORTAL_URL = 'http://localhost:5174';

const STEP = { FORM: 1, CONFIRM: 2, SUCCESS: 3 };

export default function App() {
  const [step, setStep] = useState(STEP.FORM);
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm);
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleContinue(form) {
    setPaymentForm(form);
    setStep(STEP.CONFIRM);
  }

  function handleConfirm() {
    setSubmitting(true);
    // Simulated processing delay — no real payment is submitted anywhere.
    setTimeout(() => {
      setTransactionId(generateDemoTransactionId());
      setSubmitting(false);
      setStep(STEP.SUCCESS);
    }, 500);
  }

  function handleCancel() {
    setStep(STEP.FORM);
  }

  function handleNewPayment() {
    setPaymentForm(initialPaymentForm);
    setTransactionId('');
    setStep(STEP.FORM);
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-trust" strokeWidth={2.25} />
            <span className="font-display text-base font-semibold">Meridian Pay · Payment</span>
          </div>
          <a href={CUSTOMER_PORTAL_URL} className="text-sm text-muted hover:text-ink">
            Back to portal
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
          Educational prototype · demonstration data only
        </span>

        <div className="mt-6">
          <StepIndicator current={step} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,280px]">
          <div>
            {step === STEP.FORM && <PaymentForm initialValues={paymentForm} onContinue={handleContinue} />}
            {step === STEP.CONFIRM && (
              <ConfirmationScreen
                form={paymentForm}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                submitting={submitting}
              />
            )}
            {step === STEP.SUCCESS && (
              <SuccessScreen form={paymentForm} transactionId={transactionId} onNewPayment={handleNewPayment} />
            )}
          </div>

          <SecurityNote />
        </div>
      </main>
    </div>
  );
}

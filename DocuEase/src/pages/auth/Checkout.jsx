import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowLeft, Lock, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const complianceId = searchParams.get('complianceId');
  const proId = searchParams.get('proId');
  const baseFee = parseInt(searchParams.get('fee') || '0', 10);
  const platformFee = Math.round(baseFee * 0.05);
  const total = baseFee + platformFee;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to workspace after a short delay
      setTimeout(() => {
        navigate(`/workspace/${complianceId}_${proId}`);
      }, 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Successful</h2>
          <p className="text-muted">Redirecting to your secure workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', marginBottom: '1.5rem', fontWeight: 500 }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        {/* Payment Form */}
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Checkout</h1>
          
          <Card>
            <CardContent style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: '#10B981', fontWeight: 500 }}>
                <Lock size={18} />
                <span>256-bit Secure Encrypted Payment</span>
              </div>

              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input label="Name on Card" required placeholder="Shubham Vats" />
                <Input label="Card Number" required placeholder="0000 0000 0000 0000" type="text" maxLength={19} />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input label="Expiry (MM/YY)" required placeholder="12/28" />
                  <Input label="CVV" required placeholder="123" type="password" maxLength={3} />
                </div>

                <Button type="submit" disabled={isProcessing} style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}>
                  {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card style={{ position: 'sticky', top: '2rem' }}>
            <CardContent style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-muted">Professional Fee</span>
                  <span style={{ fontWeight: 500 }}>₹{baseFee.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-muted">Platform Fee (5%)</span>
                  <span style={{ fontWeight: 500 }}>₹{platformFee.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem' }}>
                <ShieldCheck size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Your payment is held securely in escrow and only released to the professional upon successful document submission.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

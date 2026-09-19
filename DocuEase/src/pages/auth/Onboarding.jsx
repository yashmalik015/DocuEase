import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('docuease_onboarded', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background)', padding: '2rem' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <CardContent style={{ padding: '3rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ 
                  height: '4px', 
                  width: '32px', 
                  backgroundColor: i <= step ? 'var(--color-accent)' : 'var(--color-border)',
                  borderRadius: '2px'
                }} />
              ))}
            </div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {step === 1 ? 'Business Information' : step === 2 ? 'Industry & Location' : 'Existing Registrations'}
            </h1>
            <p className="text-muted">Tell us a bit about your business to personalize your experience.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '200px' }}>
            {step === 1 && (
              <>
                <Input label="Business Name" defaultValue="Vats Foods & Retail" />
                <Input label="Business Type" defaultValue="Private Limited" />
              </>
            )}
            
            {step === 2 && (
              <>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Industry</label>
                  <select style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }}>
                    <option>Food & Beverage</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Services</option>
                  </select>
                </div>
                <Input label="State" defaultValue="Haryana" />
              </>
            )}

            {step === 3 && (
              <div>
                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>What registrations do you already have?</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['GST', 'FSSAI', 'Professional Tax', 'Shops & Establishment'].map(reg => (
                    <label key={reg} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked={reg === 'GST' || reg === 'FSSAI'} />
                      <span>{reg}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNext}>
              {step === 3 ? 'Go to Dashboard' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

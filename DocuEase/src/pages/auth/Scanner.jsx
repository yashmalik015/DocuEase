import React, { useState } from 'react';
import { scannerService } from '../../services/otherServices';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ScanText, AlertCircle, CheckCircle } from 'lucide-react';

export const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    const data = await scannerService.analyzeDocument(null);
    setResult(data);
    setScanning(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Document Scanner</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem' }}>Understand your documents instantly without the legal jargon.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Upload Area */}
        <Card>
          <CardContent style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <ScanText size={64} color="var(--color-muted)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Drag & drop document here</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Supported formats: PDF, PNG, JPG</p>
            <Button onClick={handleScan} disabled={scanning}>
              {scanning ? 'Scanning document...' : 'Choose document'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Area */}
        <Card style={{ backgroundColor: 'var(--color-background)' }}>
          <CardContent style={{ padding: '2rem', minHeight: '400px' }}>
            {scanning && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '1rem', fontWeight: 500 }}>Analyzing document...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            
            {!scanning && !result && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted)' }}>
                <p>Upload a document to see the analysis here.</p>
              </div>
            )}

            {!scanning && result && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  <CheckCircle size={20} /> Analysis Complete
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Document Summary</h4>
                  <p>{result.summary}</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--color-danger)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Potential Issues</h4>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-danger)' }}>
                    {result.issues.map((iss, i) => <li key={i}>{iss}</li>)}
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--color-warning)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Important Dates</h4>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {result.importantDates.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>

                <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '0.5rem', border: '1px solid var(--color-border)', marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Recommended Next Step</h4>
                  <p style={{ fontSize: '0.875rem' }}>{result.recommendedStep}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

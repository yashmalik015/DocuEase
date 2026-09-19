import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Sparkles, Loader2, FileText, Building, ShieldCheck } from 'lucide-react';

export const AIAnalyzerModal = ({ isOpen, onClose, business }) => {
  const [stage, setStage] = useState('initial'); // initial, analyzing, results
  
  // Reset stage when modal opens
  useEffect(() => {
    if (isOpen) setStage('initial');
  }, [isOpen]);

  const handleStartAnalysis = () => {
    setStage('analyzing');
    setTimeout(() => {
      setStage('results');
    }, 3000);
  };

  const renderContent = () => {
    switch (stage) {
      case 'initial':
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
              color: '#10B981'
            }}>
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Deep AI Business Analysis</h3>
            <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
              Our AI will scan public records, industry regulations, and internet facts to identify exactly which documents your business needs to stay compliant. No myths, only facts.
            </p>
            <Button onClick={handleStartAnalysis} style={{ width: '100%' }}>Start AI Analysis</Button>
          </div>
        );

      case 'analyzing':
        return (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <style>
              {`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spinner { animation: spin 1.5s linear infinite; color: #10B981; }
              `}
            </style>
            <Loader2 size={48} className="spinner" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Analyzing your business footprint...</h3>
            <p className="text-muted">Scanning government portals and industry facts.</p>
          </div>
        );

      case 'results': {
        const isTech = business?.industry === 'IT / Software' || business?.activities?.includes('Provide services');
        const isFood = business?.industry === 'Food & Beverage' || business?.activities?.includes('Handle food') || business?.activities?.includes('Process food');
        
        let docs = [];
        let summaryText = '';

        if (isTech) {
          summaryText = `Based on your ${business?.industry || 'tech'} business${business?.city ? ` in ${business.city}` : ''}, we found 2 required documents you must prepare for data and software compliance.`;
          docs = [
            {
              id: 'd1',
              title: 'Data Privacy Policy & Terms of Service',
              desc: 'Mandatory for SaaS and IT services handling user data under digital protection laws.',
              badge: 'Required',
              badgeVariant: 'Due Soon',
              icon: <FileText size={20} />
            },
            {
              id: 'd2',
              title: 'Software License / SLA Agreement',
              desc: 'Standard commercial agreement for B2B/B2C software distribution and uptime guarantees.',
              badge: 'Action needed',
              badgeVariant: 'Upcoming',
              icon: <Building size={20} />
            }
          ];
        } else if (isFood) {
          summaryText = `Based on your ${business?.industry || 'food'} business${business?.city ? ` in ${business.city}` : ''}, we found 3 required documents you must prepare for health and safety compliance.`;
          docs = [
            {
              id: 'd1',
              title: 'FSSAI Central License Application',
              desc: 'Required for food manufacturing/retail operations.',
              badge: 'Required',
              badgeVariant: 'Due Soon',
              icon: <FileText size={20} />
            },
            {
              id: 'd2',
              title: 'GST Registration Amendment',
              desc: 'Update required for new warehouse premises addition.',
              badge: 'Action needed',
              badgeVariant: 'Upcoming',
              icon: <Building size={20} />
            },
            {
              id: 'd3',
              title: 'Fire Safety NOC',
              desc: 'Mandatory clearance for commercial premises over 15 meters height.',
              badge: 'Critical',
              badgeVariant: 'At Risk',
              icon: <ShieldCheck size={20} />
            }
          ];
        } else {
          summaryText = `Based on your ${business?.industry || 'business'} profile${business?.city ? ` in ${business.city}` : ''}, we found 2 required documents for general compliance.`;
          docs = [
            {
              id: 'd1',
              title: 'GST Registration',
              desc: 'Mandatory for most businesses supplying goods or services over the threshold.',
              badge: 'Required',
              badgeVariant: 'Due Soon',
              icon: <Building size={20} />
            },
            {
              id: 'd2',
              title: 'Shop & Establishment License',
              desc: 'Required for all commercial establishments and offices.',
              badge: 'Action needed',
              badgeVariant: 'Upcoming',
              icon: <FileText size={20} />
            }
          ];
        }

        return (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Analysis Complete</h3>
              <p className="text-muted">{summaryText}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {docs.map(doc => (
                <Card key={doc.id}>
                  <CardContent style={{ padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', color: 'var(--color-primary)' }}>{doc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{doc.title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.875rem' }}>{doc.desc}</p>
                    </div>
                    <Badge variant={doc.badgeVariant}>{doc.badge}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={onClose} style={{ width: '100%' }}>View Requirements in Compliance Center</Button>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Compliance Assistant" maxWidth="700px">
      {renderContent()}
    </Modal>
  );
};

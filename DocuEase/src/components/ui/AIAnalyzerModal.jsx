import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Sparkles, Loader2, FileText, Building, ShieldCheck } from 'lucide-react';
import { complianceService } from '../../services/complianceService';
import { authService } from '../../services/authService';

export const AIAnalyzerModal = ({ isOpen, onClose, business }) => {
  const [stage, setStage] = useState('initial'); // initial, analyzing, results
  const [analyzedDocs, setAnalyzedDocs] = useState([]);
  
  // Reset stage when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('initial');
      setAnalyzedDocs([]);
    }
  }, [isOpen]);

  const handleStartAnalysis = async () => {
    setStage('analyzing');
    const targetBizId = business?.id || authService.getActiveBusiness()?.id;
    if (targetBizId) {
      complianceService.refreshForBusiness(targetBizId);
    }
    const data = await complianceService.getAll(targetBizId);
    setAnalyzedDocs(data);
    setStage('results');
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
        const summaryText = `Analysis Complete. We found ${analyzedDocs.length} required compliance documents based on your business profile.`;
        
        const docs = analyzedDocs.map(c => ({
          id: c.id,
          title: c.title,
          desc: c.category,
          badge: 'Required',
          badgeVariant: 'Due Soon',
          icon: <FileText size={20} />
        }));

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

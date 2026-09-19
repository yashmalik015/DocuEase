import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';
import { FileText, CheckCircle2, Building, ShieldCheck, Loader2 } from 'lucide-react';
import { DynamicFormEngine } from './DynamicFormEngine';
import { documentService } from '../../services/documentService';
import { complianceService } from '../../services/complianceService';

export const ComplianceDetailsModal = ({ isOpen, onClose, compliance, onGenerateSuccess }) => {
  const [stage, setStage] = useState('details'); // details, fetching-schema, form, generating, success
  const [schema, setSchema] = useState(null);
  const [generatedDocName, setGeneratedDocName] = useState('');
  const [draftedContent, setDraftedContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStage('details');
      setSchema(null);
      setDraftedContent('');
    }
  }, [isOpen, compliance]);

  if (!compliance) return null;

  const handleCreateDocument = async () => {
    setStage('fetching-schema');
    try {
      const res = await fetch('http://localhost:3001/api/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentTitle: compliance.title })
      });
      const data = await res.json();
      setSchema(data);
      setStage('form');
    } catch (err) {
      console.error(err);
      // Fallback
      setSchema({
        title: `Drafting: ${compliance.title}`,
        fields: [
          { name: 'businessName', label: 'Business Name', type: 'text', required: true }
        ]
      });
      setStage('form');
    }
  };

  const handleFormSubmit = async (formData) => {
    setStage('generating');
    
    try {
      const res = await fetch('http://localhost:3001/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentTitle: compliance.title, formData })
      });
      
      const { documentText } = await res.json();
      setDraftedContent(documentText);

      // Create document in vault
      const newDoc = await documentService.upload({
        filename: `${compliance.title.replace(/[^a-zA-Z0-9]/g, '_')}_Generated.txt`,
        type: compliance.category,
        relatedCompliance: compliance.title,
        content: documentText // saving the generated content
      });

      // Mark compliance as completed
      await complianceService.updateStatus(compliance.id, 'Completed');
      
      setGeneratedDocName(newDoc.filename);
      setStage('success');
    } catch (err) {
      console.error(err);
      alert('Failed to generate document');
      setStage('form');
    }
  };

  const handleFinish = () => {
    onClose();
    if (onGenerateSuccess) onGenerateSuccess();
  };

  const renderContent = () => {
    switch (stage) {
      case 'details':
        return (
          <div>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.75rem', color: 'var(--color-primary)' }}>
                {compliance.category === 'Legal' ? <FileText size={32} /> : 
                 compliance.category === 'Clearance' ? <ShieldCheck size={32} /> : 
                 <Building size={32} />}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>{compliance.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Badge variant="outline">{compliance.category}</Badge>
                  <Badge variant={compliance.status}>{compliance.status}</Badge>
                  {compliance.priority === 'High' && <Badge variant="At Risk">Critical Priority</Badge>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Why this applies</h4>
                <p style={{ lineHeight: '1.5' }}>{compliance.applicabilityReason || 'Mandatory compliance based on your business profile.'}</p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Description</h4>
                <p style={{ lineHeight: '1.5' }}>{compliance.description || 'Regulatory document requiring submission.'}</p>
              </div>

              {compliance.deadline && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--color-warning)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Deadline</h4>
                  <p style={{ fontWeight: 500 }}>{compliance.deadline}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button onClick={handleCreateDocument}>Create Document</Button>
            </div>
          </div>
        );

      case 'fetching-schema':
        return (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <style>
              {`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spinner { animation: spin 1.5s linear infinite; color: #10B981; }
              `}
            </style>
            <Loader2 size={48} className="spinner" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>AI Generating Form...</h3>
            <p className="text-muted">Customizing fields for {compliance.title}</p>
          </div>
        );

      case 'form':
        return (
          <div>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: '#10B981' }}>
                <FileText size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{schema?.title || `Drafting: ${compliance.title}`}</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Please provide the required details to format your document.</p>
              </div>
            </div>
            
            <DynamicFormEngine 
              schema={schema} 
              onSubmit={handleFormSubmit} 
              onCancel={() => setStage('details')} 
              isGenerating={false} 
            />
          </div>
        );

      case 'generating':
        return (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <Loader2 size={48} className="spinner" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Drafting legal document...</h3>
            <p className="text-muted">Applying correct formatting and legal clauses.</p>
          </div>
        );

      case 'success':
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Document Generated</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
              Your {compliance.title} has been generated successfully and saved to your Document Vault.
            </p>
            
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', border: '1px solid var(--color-border)', marginBottom: '2rem', textAlign: 'left', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-muted)' }}>
                <FileText size={16} /> <span style={{ fontSize: '0.875rem' }}>File Name: <strong>{generatedDocName}</strong></span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', whiteSpace: 'pre-wrap' }}>
                {draftedContent}
              </div>
            </div>

            <Button onClick={handleFinish} style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
              Return to Compliance Center
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compliance Requirement" maxWidth="700px">
      {renderContent()}
    </Modal>
  );
};

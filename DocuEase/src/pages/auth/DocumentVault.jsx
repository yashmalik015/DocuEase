import React, { useEffect, useState } from 'react';
import { documentService } from '../../services/documentService';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';

export const DocumentVault = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    setLoading(true);
    const data = await documentService.getAll();
    setDocuments(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await documentService.delete(id);
    fetchDocs();
  };

  if (loading) return <div>Loading documents...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Document Vault</h1>
          <p className="text-muted" style={{ fontSize: '1.125rem' }}>Securely store and manage all your compliance documents.</p>
        </div>
        <Button style={{ display: 'flex', gap: '0.5rem' }}>
          <Upload size={18} /> Upload Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--color-surface)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
          <FileText size={48} color="var(--color-muted)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Documents Yet</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>You haven't generated or uploaded any documents for this business.</p>
          <Button onClick={() => navigate('/compliance')}>Go to Compliance Center</Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {documents.map(doc => (
          <Card key={doc.id}>
            <CardContent style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-accent-soft)', borderRadius: '0.5rem' }}>
                    <FileText color="var(--color-accent)" size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, wordBreak: 'break-all' }}>{doc.filename}</h3>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>{doc.type}</p>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <Badge variant={doc.status}>{doc.status}</Badge>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="ghost" size="sm" style={{ padding: '0.25rem' }}>
                    <Download size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}
    </div>
  );
};

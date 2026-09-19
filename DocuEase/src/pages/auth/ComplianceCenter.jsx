import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complianceService } from '../../services/complianceService';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AIAnalyzerModal } from '../../components/ui/AIAnalyzerModal';
import { DocumentPreviewModal } from '../../components/ui/DocumentPreviewModal';
import { ComplianceDetailsModal } from '../../components/ui/ComplianceDetailsModal';
import { Sparkles, Eye } from 'lucide-react';

export const ComplianceCenter = () => {
  const [compliances, setCompliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const data = await complianceService.getAll();
    setCompliances(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading compliance data...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Compliance Center</h1>
          <p className="text-muted" style={{ fontSize: '1.125rem' }}>Manage and track all your regulatory requirements.</p>
        </div>
        <Button onClick={() => setIsAnalyzerOpen(true)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Sparkles size={18} />
          AI Business Analyzer
        </Button>
      </div>

      <AIAnalyzerModal isOpen={isAnalyzerOpen} onClose={() => {
        setIsAnalyzerOpen(false);
        fetchData();
      }} />
      <DocumentPreviewModal 
        isOpen={!!previewDocument} 
        onClose={() => setPreviewDocument(null)} 
        documentTitle={previewDocument?.title} 
      />
      <ComplianceDetailsModal
        isOpen={!!selectedCompliance}
        onClose={() => setSelectedCompliance(null)}
        compliance={selectedCompliance}
        onGenerateSuccess={() => {
          setSelectedCompliance(null);
          fetchData();
        }}
      />

      <Card>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
          <select style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }}>
            <option>All Types</option>
            <option>Tax</option>
            <option>License</option>
          </select>
          <select style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }}>
            <option>All Statuses</option>
            <option>Due Soon</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--color-muted)' }}>Compliance</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--color-muted)' }}>Category</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--color-muted)' }}>Deadline</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--color-muted)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--color-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...compliances].sort((a, b) => {
               const priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
               return priorityMap[b.priority] - priorityMap[a.priority];
            }).map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.5rem', fontWeight: 500 }}>
                  {item.title}
                  {item.priority === 'High' && <span style={{ marginLeft: '0.5rem', color: '#EF4444', fontSize: '0.75rem' }}>★ Critical</span>}
                </td>
                <td style={{ padding: '1.5rem' }}>{item.category}</td>
                <td style={{ padding: '1.5rem' }}>{item.deadline}</td>
                <td style={{ padding: '1.5rem' }}><Badge variant={item.status}>{item.status}</Badge></td>
                <td style={{ padding: '1.5rem' }}>
                  {item.status === 'Completed' ? (
                    <Button variant="outline" size="sm" onClick={() => setSelectedCompliance(item)}>View details</Button>
                  ) : item.isDrafted ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button size="sm" variant="outline" onClick={() => setPreviewDocument(item)}>
                        <Eye size={16} style={{ marginRight: '0.25rem' }} /> Preview
                      </Button>
                      <Button size="sm" onClick={() => navigate(`/hire/${item.id}`)}>Submit</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setSelectedCompliance(item)}>Create</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

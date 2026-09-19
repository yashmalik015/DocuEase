import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockCompliances, mockProfessionals } from '../../data/mockData';
import { ArrowLeft, Star, MapPin, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

export const HireProfessional = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [compliance, setCompliance] = useState(null);

  useEffect(() => {
    // Mock fetch by ID
    const found = mockCompliances.find(c => c.id === id);
    if (found) setCompliance(found);
  }, [id]);

  if (!compliance) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', marginBottom: '1.5rem', fontWeight: 500 }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Left Column: Professionals */}
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Select a Professional</h1>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>Choose a verified expert to review and submit your document.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {mockProfessionals.map(pro => {
              // Calculate a dynamic fee based on the document fee + pro base markup
              const proFee = compliance.estimatedFee + (pro.rating > 4.8 ? 500 : 0);

              return (
                <Card key={pro.id} style={{ transition: 'border-color 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
                  <CardContent style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{pro.name}</h3>
                          <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', gap: '1rem' }}>
                            <span>{pro.qualification}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={14} fill="#F59E0B" color="#F59E0B" /> {pro.rating}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{proFee}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Estimated Fee</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {pro.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> {pro.casesHandled} cases</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge variant={pro.availability === 'Available' ? 'Completed' : 'Due Soon'}>{pro.availability}</Badge>
                        <Button 
                          onClick={() => navigate(`/checkout?complianceId=${compliance.id}&proId=${pro.id}&fee=${proFee}`)}
                        >
                          Hire Professional
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Column: Context */}
        <div>
          <Card style={{ position: 'sticky', top: '2rem' }}>
            <CardContent style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText size={20} color="var(--color-primary)" />
                <h3 style={{ fontWeight: 600 }}>Submission Details</h3>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{compliance.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{compliance.category} • Due: {compliance.deadline}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Document drafted successfully</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Business details verified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-muted)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px dashed var(--color-muted)', flexShrink: 0, marginTop: '2px' }} />
                  <span>Professional review & submission</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

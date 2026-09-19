import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Building2, Plus, ArrowRight } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { AIAnalyzerModal } from '../../components/ui/AIAnalyzerModal'; // Reuse the AI modal for business creation

export const BusinessSelector = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newBizType, setNewBizType] = useState('');
  const [newBizEntity, setNewBizEntity] = useState('Private Limited');
  const [newBizTurnover, setNewBizTurnover] = useState('0-20L');
  const [newBizEmployees, setNewBizEmployees] = useState('1-10');
  const [isFoodRelated, setIsFoodRelated] = useState(false);
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBusinesses(authService.getBusinesses());
  }, []);

  const handleSelect = (id) => {
    authService.setActiveBusiness(id);
    navigate('/dashboard');
  };

  const handleCreateBusiness = (e) => {
    e.preventDefault();
    if (!newBizName) return;
    
    authService.addBusiness({ 
      name: newBizName, 
      type: newBizType || 'General', 
      entity: newBizEntity,
      turnover: newBizTurnover,
      employees: newBizEmployees,
      isFoodRelated,
      location: 'India' 
    });
    setBusinesses(authService.getBusinesses());
    setIsAdding(false);
    
    // Trigger AI analyzer flow for the new business
    setShowAIAnalyzer(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>Welcome back</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem', textAlign: 'center', marginBottom: '3rem' }}>Select a business to view its compliance workspace.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {businesses.map(biz => (
            <Card 
              key={biz.id} 
              style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid var(--color-border)' }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              onClick={() => handleSelect(biz.id)}
            >
              <CardContent style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', color: '#10B981' }}>
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{biz.name}</h2>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>{biz.type}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-muted" style={{ fontSize: '0.875rem' }}>{biz.location}</span>
                  <ArrowRight size={18} color="var(--color-muted)" />
                </div>
              </CardContent>
            </Card>
          ))}

          <Card 
            style={{ cursor: 'pointer', border: '1px dashed var(--color-border)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '180px' }}
            onClick={() => setIsAdding(true)}
            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <div style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
              <Plus size={32} style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontWeight: 500 }}>Add New Business</p>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add New Business" maxWidth="500px">
          <form onSubmit={handleCreateBusiness} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Input label="Business Name" required placeholder="e.g. Optixi Media" value={newBizName} onChange={e => setNewBizName(e.target.value)} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Industry / Sector" required placeholder="e.g. IT Services, Retail" value={newBizType} onChange={e => setNewBizType(e.target.value)} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Entity Type</label>
                <select value={newBizEntity} onChange={e => setNewBizEntity(e.target.value)} style={{ padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)' }}>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">Limited Liability Partnership</option>
                  <option value="Private Limited">Private Limited Company</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Estimated Annual Turnover</label>
                <select value={newBizTurnover} onChange={e => setNewBizTurnover(e.target.value)} style={{ padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)' }}>
                  <option value="0-20L">Under ₹20 Lakhs</option>
                  <option value="20L-40L">₹20 - ₹40 Lakhs</option>
                  <option value="40L-1.5Cr">₹40 Lakhs - ₹1.5 Cr</option>
                  <option value=">1.5Cr">Over ₹1.5 Cr</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Number of Employees</label>
                <select value={newBizEmployees} onChange={e => setNewBizEmployees(e.target.value)} style={{ padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)' }}>
                  <option value="1-10">1 - 10</option>
                  <option value="11-50">11 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              <input type="checkbox" checked={isFoodRelated} onChange={e => setIsFoodRelated(e.target.checked)} style={{ width: '16px', height: '16px' }} />
              Does this business manufacture, sell, or handle food products?
            </label>

            <Button type="submit" style={{ marginTop: '1.5rem', padding: '0.75rem' }}>Analyze My Business</Button>
          </form>
      </Modal>

      <AIAnalyzerModal isOpen={showAIAnalyzer} onClose={() => setShowAIAnalyzer(false)} />
    </div>
  );
};

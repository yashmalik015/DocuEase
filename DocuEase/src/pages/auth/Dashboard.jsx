import React, { useEffect, useState } from 'react';
import { complianceService } from '../../services/complianceService';
import { authService } from '../../services/authService';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LineProgress, CircularProgress } from '../../components/ui/Progress';
import { AIAnalyzerModal } from '../../components/ui/AIAnalyzerModal';
import { BusinessProfileModal } from '../../components/ui/BusinessProfileModal';
import { AlertCircle, Clock, CheckCircle2, Settings } from 'lucide-react';

export const Dashboard = () => {
  const [compliances, setCompliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBusiness, setActiveBusiness] = useState(() => authService.getActiveBusiness());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAIAnalyzerOpen, setIsAIAnalyzerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const biz = authService.getActiveBusiness();
    if (biz && (!activeBusiness || biz.id !== activeBusiness.id)) {
       setActiveBusiness(biz);
    }
    
    const fetchData = async () => {
      const data = await complianceService.getAll();
      setCompliances(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const user = authService.getCurrentUser();

  const handleUpdateBusiness = (updatedDetails) => {
    const updated = authService.updateBusiness(activeBusiness.id, updatedDetails);
    setActiveBusiness(updated);
    setIsProfileModalOpen(false);
    
    complianceService.refreshForBusiness(updated.id);
    complianceService.getAll(updated.id).then(data => setCompliances(data));
    
    // Refresh documents so Vault is accurate
    import('../../services/documentService').then(({ documentService }) => {
      documentService.refreshForBusiness(updated.id);
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Simulate AI re-analysis briefly
    setIsAIAnalyzerOpen(true);
  };

  if (loading) return <div>Loading dashboard...</div>;

  const total = compliances.length;
  const completed = compliances.filter(c => c.status === 'Completed').length;
  const dueSoon = compliances.filter(c => c.status === 'Due Soon').length;
  const atRisk = compliances.filter(c => c.status === 'At Risk').length;

  const needsAttention = compliances.filter(c => c.status !== 'Completed');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Good morning, {user?.name ? user.name.split(' ')[0] : 'User'}.</h1>
          <p className="text-muted" style={{ fontSize: '1.125rem' }}>Here is the compliance workspace for <strong>{activeBusiness.name}</strong>.</p>
        </div>
        <Button variant="outline" onClick={() => setIsProfileModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={18} />
          Business Profile
        </Button>
      </div>

      {/* Profile Update Modal */}
      <BusinessProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        business={activeBusiness}
        onUpdate={handleUpdateBusiness}
      />
      
      {/* AI Re-analyzer Simulation */}
      <AIAnalyzerModal 
        isOpen={isAIAnalyzerOpen} 
        onClose={() => setIsAIAnalyzerOpen(false)} 
        business={activeBusiness}
      />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <Card>
          <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>TOTAL COMPLIANCES</p>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>{total}</p>
            </div>
            <LineProgress value={completed} max={total || 1} style={{ marginTop: '1rem' }} />
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" /> COMPLETED
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>{completed}</p>
            </div>
            <CircularProgress value={completed} max={total || 1} size={54} strokeWidth={5} color="#10B981" />
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--color-warning)" /> DUE SOON
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{dueSoon}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} color="var(--color-danger)" /> AT RISK
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{atRisk}</p>
          </CardContent>
        </Card>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Needs attention</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {needsAttention.length === 0 ? (
          <Card>
            <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
              <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>You're all caught up.</h3>
              <p className="text-muted">No pending compliances at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          needsAttention.map(item => (
            <Card key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{item.title}</h3>
                  <Badge variant={item.status}>{item.status}</Badge>
                </div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Due: {item.deadline}</p>
              </div>
              <Button>Review issue</Button>
            </Card>
          ))
        )}
      </div>

      {/* Success Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          animation: 'slideUp 0.3s ease'
        }}>
          Business profile updated. Your compliance view has been refreshed.
        </div>
      )}
    </div>
  );
};

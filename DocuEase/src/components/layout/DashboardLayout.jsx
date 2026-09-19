import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FolderOpen, Scan, Bell, Users, LogOut, Briefcase } from 'lucide-react';
import { authService } from '../../services/authService';
import logo from '../../assets/seconry logo.png';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBusiness, setActiveBusiness] = useState(() => authService.getActiveBusiness());

  useEffect(() => {
    const biz = authService.getActiveBusiness();
    if (!biz) {
      navigate('/businesses');
    } else if (!activeBusiness || biz.id !== activeBusiness.id) {
      setActiveBusiness(biz);
    }
  }, [navigate, activeBusiness]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/compliance', label: 'Compliance Center', icon: <CheckSquare size={20} /> },
    { path: '/documents', label: 'Document Vault', icon: <FolderOpen size={20} /> },
    { path: '/scanner', label: 'AI Scanner', icon: <Scan size={20} /> },
    { path: '/notices', label: 'Notices', icon: <Bell size={20} /> },
    { path: '/professionals', label: 'Professionals', icon: <Users size={20} /> },
  ];

  if (!activeBusiness) {
    return <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)', alignItems: 'center', justifyContent: 'center' }}>Loading workspace...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--color-surface)', 
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <img src={logo} alt="DocuEase Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>DocuEase</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>AI Compliance Engine</span>
          </div>
        </div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 1rem' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                  backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
              >
                <div style={{ color: isActive ? '#10B981' : 'inherit' }}>{item.icon}</div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
              width: '100%', border: 'none', background: 'none', color: 'var(--color-muted)',
              cursor: 'pointer', fontWeight: 500
            }}
          >
            <LogOut size={20} /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ 
          height: '70px', 
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-background)', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border)' }}>
              <Briefcase size={16} color="var(--color-muted)" />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{activeBusiness.name}</span>
              <button onClick={() => navigate('/businesses')} style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#10B981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Switch</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
              <Bell size={20} />
            </button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.875rem' }}>
              SV
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

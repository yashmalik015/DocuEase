import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../../assets/seconry logo.png';

export const PublicLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logo} alt="DocuEase Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>DocuEase</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>AI Compliance Engine</span>
          </div>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/features" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Features</Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); alert('Pricing section coming soon!'); }} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Pricing</Link>
          <Link to="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Log in</Link>
          <Link to="/signup" className="btn-get-started" style={{ 
            backgroundColor: '#10B981', 
            color: 'white', 
            padding: '0.625rem 1.25rem', 
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}>
            Get started
          </Link>
        </nav>
      </header>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      
      <footer style={{ 
        padding: '3rem 2rem', 
        borderTop: '1px solid var(--color-border)', 
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', filter: 'grayscale(100%)', opacity: 0.5 }}>
          <img src={logo} alt="DocuEase Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text)' }}>DocuEase</span>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} DocuEase. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

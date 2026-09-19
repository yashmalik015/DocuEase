import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { CheckCircle, Shield, FileText, Search, Users, Activity } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 2rem', 
        textAlign: 'center',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Compliance, finally in one place.
          </h1>
          <p className="animate-fade-in text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', animationDelay: '0.1s' }}>
            Know what applies. Understand what's at risk. Get the right help and keep everything on track.
          </p>
          <div className="animate-fade-in flex justify-center gap-4" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button size="lg">Get started</Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--color-background)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>
            Compliance shouldn't live across WhatsApp, Excel and five different portals.
          </h2>
          <p className="text-muted" style={{ fontSize: '1.125rem' }}>
            Managing GST, FSSAI, Professional Tax, and other licenses is scattered and confusing. DocuEase brings it all together so you can focus on growing your business.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '5rem 2rem', backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '4rem' }}>How DocuEase works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Search size={32} color="var(--color-accent)" />, title: 'Detect', desc: 'Identify required compliances.' },
              { icon: <FileText size={32} color="var(--color-accent)" />, title: 'Explain', desc: 'Understand requirements in plain English.' },
              { icon: <Users size={32} color="var(--color-accent)" />, title: 'Connect', desc: 'Find the right professionals.' },
              { icon: <CheckCircle size={32} color="var(--color-accent)" />, title: 'Resolve', desc: 'Take action confidently.' },
              { icon: <Activity size={32} color="var(--color-accent)" />, title: 'Track', desc: 'Monitor progress in real-time.' }
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{step.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p className="text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & AI Boundary */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Shield size={48} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '2rem' }}>Your compliance, your control.</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>
            AI helps identify, organise and explain information. Final decisions and filings remain with qualified professionals.
          </p>
        </div>
      </section>
    </div>
  );
};

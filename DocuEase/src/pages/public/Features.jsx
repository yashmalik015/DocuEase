import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Search, FileText, Users, CheckCircle, Activity, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export const Features = () => {
  const steps = [
    {
      id: '01',
      title: 'Detect',
      subtitle: 'AI-Powered Business Analysis',
      description: 'Simply tell us about your business, and our smart AI instantly scans through hundreds of state and central regulations to identify exactly what compliances apply to you. No more guessing games.',
      icon: <Search size={48} color="#10B981" />,
      color: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: '02',
      title: 'Explain',
      subtitle: 'Jargon-Free Clarity',
      description: 'We translate complex government notifications and legal jargon into simple, actionable steps. Understand exactly what you need to do, when it is due, and what happens if you miss it.',
      icon: <FileText size={48} color="#3B82F6" />,
      color: 'rgba(59, 130, 246, 0.1)'
    },
    {
      id: '03',
      title: 'Connect',
      subtitle: 'Verified Professional Marketplace',
      description: 'When you are ready to file, we seamlessly connect you with verified Chartered Accountants and legal professionals. Compare ratings, transparent pricing, and hire with confidence.',
      icon: <Users size={48} color="#8B5CF6" />,
      color: 'rgba(139, 92, 246, 0.1)'
    },
    {
      id: '04',
      title: 'Resolve',
      subtitle: 'Secure Escrow & Online Workspace',
      description: 'Your payment is held securely in escrow until the work is done. Collaborate with your hired professional via chat and secure video meetings, all from within the DocuEase platform.',
      icon: <CheckCircle size={48} color="#F59E0B" />,
      color: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: '05',
      title: 'Track',
      subtitle: 'Real-Time Dashboard',
      description: 'Monitor the live status of your filings and never miss a deadline again. Get automated alerts for upcoming renewals, due dates, and compliance risks before they become penalties.',
      icon: <Activity size={48} color="#EC4899" />,
      color: 'rgba(236, 72, 153, 0.1)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 2rem 4rem', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(16, 185, 129, 0.05) 100%)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '60%', height: '200%', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', transform: 'rotate(-15deg)' }} />
        
        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '2rem', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            <Sparkles size={16} /> The Operating System for Compliance
          </div>
          <h1 className="animate-fade-in" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            How DocuEase Works
          </h1>
          <p className="animate-fade-in text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', animationDelay: '0.1s', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            We've reimagined the entire compliance journey. From discovery to filing, experience a seamless, fully integrated workflow designed specifically for small businesses.
          </p>
        </div>
      </section>

      {/* Main Features Steps */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-background)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {steps.map((step, index) => {
              const isEven = index % 2 !== 0;
              return (
                <div key={step.id} style={{ 
                  display: 'flex', 
                  flexDirection: isEven ? 'row-reverse' : 'row', 
                  gap: '4rem', 
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  {/* Visual Side */}
                  <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ 
                      width: '100%', 
                      aspectRatio: '1', 
                      maxWidth: '400px',
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: '2rem',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: `radial-gradient(circle at center, ${step.color} 0%, transparent 70%)`,
                        borderRadius: '2rem'
                      }} />
                      <div style={{ 
                        width: '120px', 
                        height: '120px', 
                        backgroundColor: 'var(--color-background)', 
                        borderRadius: '1.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div style={{ flex: '1 1 400px' }}>
                    <span style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.2, lineHeight: 1, display: 'block', marginBottom: '1rem' }}>
                      {step.id}
                    </span>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{step.title}</h2>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>{step.subtitle}</h3>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card style={{ background: 'linear-gradient(145deg, var(--color-background), var(--color-surface))' }}>
              <CardContent style={{ padding: '2rem' }}>
                <Zap size={32} color="#F59E0B" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Lightning Fast</h3>
                <p className="text-muted">What used to take days of back-and-forth now takes minutes. AI accelerates the busywork so professionals can focus on filing.</p>
              </CardContent>
            </Card>
            <Card style={{ background: 'linear-gradient(145deg, var(--color-background), var(--color-surface))' }}>
              <CardContent style={{ padding: '2rem' }}>
                <Shield size={32} color="#10B981" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Bank-Grade Security</h3>
                <p className="text-muted">Your business documents and payments are protected with 256-bit encryption. We take your privacy as seriously as your compliance.</p>
              </CardContent>
            </Card>
            <Card style={{ background: 'linear-gradient(145deg, var(--color-background), var(--color-surface))' }}>
              <CardContent style={{ padding: '2rem' }}>
                <Users size={32} color="#3B82F6" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Expert Vetted</h3>
                <p className="text-muted">Every CA and legal professional on our platform passes a rigorous screening process. You only work with the best.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Ready to simplify your compliance?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', marginBottom: '2.5rem' }}>
            Join thousands of modern Indian businesses that trust DocuEase to handle their regulatory heavy lifting.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/signup">
              <Button size="lg" style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}>
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

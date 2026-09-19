import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('business');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.login(email, password);
      // We could save userType here if backend supported it
      navigate('/businesses');
    } catch (err) {
      setError('Invalid credentials. Password must be at least 6 characters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <CardContent style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome back</h1>
            <p className="text-muted">Log in to your DocuEase account.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.25rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem' }}>
            <button 
              type="button"
              onClick={() => setUserType('business')}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: userType === 'business' ? '#10B981' : 'transparent',
                boxShadow: userType === 'business' ? 'var(--shadow-sm)' : 'none',
                color: userType === 'business' ? 'white' : 'var(--color-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              Business Owner
            </button>
            <button 
              type="button"
              onClick={() => setUserType('professional')}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: userType === 'professional' ? '#10B981' : 'transparent',
                boxShadow: userType === 'professional' ? 'var(--shadow-sm)' : 'none',
                color: userType === 'professional' ? 'white' : 'var(--color-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              CA / Lawyer
            </button>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input 
              label="Email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={userType === 'business' ? "shubham@example.com" : "ca@example.com"}
            />
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            
            {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem' }}>{error}</p>}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-accent)' }}>Forgot password?</a>
            </div>

            <Button type="submit" disabled={loading} style={{ marginTop: '1rem', width: '100%' }}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Create one</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

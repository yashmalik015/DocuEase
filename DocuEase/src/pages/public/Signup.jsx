import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('business');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      await authService.signup({
        name: formData.name,
        email: formData.email,
        businessName: userType === 'business' ? formData.businessName : 'Professional Practice',
        role: userType
      });
      // Redirect to business selector
      navigate('/businesses');
    } catch (err) {
      setError('Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }}>
        <CardContent style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create an account</h1>
            <p className="text-muted">Start managing compliance effortlessly.</p>
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

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input 
              label="Full name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input 
              label={userType === 'business' ? "Business email" : "Professional email"} 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {userType === 'business' && (
              <Input 
                label="Business name" 
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            )}
            <Input 
              label="Password" 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input 
              label="Confirm password" 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem' }}>{error}</p>}
            
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input type="checkbox" required style={{ marginTop: '0.25rem' }} /> 
                <span>I agree to the Terms and Privacy Policy.</span>
              </label>
            </div>

            <Button type="submit" disabled={loading} style={{ marginTop: '1rem', width: '100%' }}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Log in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

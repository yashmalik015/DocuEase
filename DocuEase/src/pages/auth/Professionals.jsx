import React, { useEffect, useState } from 'react';
import { professionalService } from '../../services/otherServices';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Star, MapPin, Briefcase } from 'lucide-react';

export const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await professionalService.getAll();
      setProfessionals(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading professionals...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Find the right professional.</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem' }}>Connect with verified CAs, CSs, and legal advisors for your compliance needs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {professionals.map(pro => (
          <Card key={pro.id}>
            <CardContent style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-muted)' }}>
                  {pro.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{pro.name}</h3>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.875rem' }}>{pro.qualification}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{pro.rating}</span>
                    <span className="text-muted" style={{ fontSize: '0.875rem' }}>({pro.casesHandled} cases)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <Briefcase size={16} color="var(--color-muted)" />
                  <span>{pro.specialisation} &bull; {pro.experience}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <MapPin size={16} color="var(--color-muted)" />
                  <span>{pro.location}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="outline" style={{ flex: 1 }}>View profile</Button>
                <Button style={{ flex: 1 }}>Request help</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

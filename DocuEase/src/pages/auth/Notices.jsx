import React, { useEffect, useState } from 'react';
import { noticeService } from '../../services/otherServices';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await noticeService.getAll();
      setNotices(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading notices...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Government Notices</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem' }}>Track and respond to official communications.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notices.length === 0 ? (
          <Card>
            <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
              <p className="text-muted">No notices at this time.</p>
            </CardContent>
          </Card>
        ) : (
          notices.map(notice => (
            <Card key={notice.id}>
              <CardContent style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{notice.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                      <span>Received: {notice.date}</span>
                      <span>Source: {notice.source}</span>
                    </div>
                  </div>
                  <Badge variant={notice.status}>{notice.status}</Badge>
                </div>
                
                <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.875rem' }}>{notice.summary}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    <span style={{ color: 'var(--color-muted)' }}>Recommended step:</span> {notice.recommendedStep}
                  </p>
                  <Button>View details</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

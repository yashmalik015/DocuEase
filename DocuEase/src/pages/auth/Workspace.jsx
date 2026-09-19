import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ArrowLeft, Send, Video, FileText, CheckCircle2, Clock, Check, MoreVertical } from 'lucide-react';

export const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'pro', text: 'Hello! I have received your document and the payment is secured in escrow. I will start the review right away.', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const msg = { id: Date.now(), sender: 'user', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');

    // Simulate auto-reply
    setTimeout(() => {
      const reply = { id: Date.now() + 1, sender: 'pro', text: 'Noted. Could we jump on a quick 5-min online meet to confirm a few details?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => navigate('/compliance')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontWeight: 500 }}
        >
          <ArrowLeft size={18} /> Back to Compliance
        </button>
        
        <Button onClick={() => setIsVideoOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6' }}>
          <Video size={18} /> Join Online Meet
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        {/* Left Side: Status & Document */}
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Submission Workspace</h2>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Active Document Review</p>
          </div>
          
          <CardContent style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: '#10B981' }}>
                <FileText size={24} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '0.875rem' }}>GST Return (GSTR-3B)</h3>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Draft generated via AI</p>
              </div>
            </div>

            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Live Status</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--color-border)' }} />
              
              <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={14} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600 }}>Payment Secured</h4>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>Funds in escrow</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-background)', border: '2px solid #3B82F6', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={14} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3B82F6' }}>Under Professional Review</h4>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>CA is reviewing the draft</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-background)', border: '2px solid var(--color-border)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-muted)' }}>Filing with Govt</h4>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-background)', border: '2px solid var(--color-border)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-muted)' }}>Completed</h4>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Chat */}
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                PR
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Professional Chat</h3>
                <p style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} /> Online
                </p>
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}><MoreVertical size={20} /></button>
          </div>

          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                  <div style={{ 
                    maxWidth: '75%', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '1rem',
                    borderBottomRightRadius: isUser ? '0' : '1rem',
                    borderBottomLeftRadius: isUser ? '1rem' : '0',
                    backgroundColor: isUser ? 'var(--color-primary)' : 'var(--color-background)',
                    color: isUser ? 'white' : 'var(--color-text)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.625rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>{msg.time}</span>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                style={{ 
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '2rem', 
                  border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)',
                  outline: 'none', fontSize: '0.9375rem'
                }}
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                style={{ 
                  width: '42px', height: '42px', borderRadius: '50%', 
                  backgroundColor: newMessage.trim() ? 'var(--color-primary)' : 'var(--color-border)',
                  color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s'
                }}
              >
                <Send size={18} style={{ marginLeft: '2px' }} />
              </button>
            </form>
          </div>
        </Card>
      </div>

      {/* Video Meet Modal */}
      <Modal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} title="Secure Online Meeting" maxWidth="800px">
        <div style={{ width: '100%', height: '450px', backgroundColor: '#1F2937', borderRadius: '0.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Main Video (Professional) */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#374151', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={32} />
              </div>
              <p>Waiting for professional to join...</p>
            </div>
          </div>
          
          {/* Picture in Picture (User) */}
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '160px', height: '120px', backgroundColor: '#000', borderRadius: '0.5rem', border: '2px solid rgba(255,255,255,0.1)' }}>
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563', fontSize: '0.75rem' }}>Camera On</div>
          </div>

          {/* Controls */}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1.5rem', borderRadius: '2rem', backdropFilter: 'blur(4px)' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF4444', color: 'white' }} onClick={() => setIsVideoOpen(false)}>
               <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

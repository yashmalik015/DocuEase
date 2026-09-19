import React from 'react';

export const Input = React.forwardRef(({ label, type = 'text', error, ...props }, ref) => {
  return (
    <div style={{ marginBottom: '1rem', width: '100%', textAlign: 'left' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          borderRadius: '0.375rem',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
          fontSize: '0.875rem',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
        onBlur={(e) => e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border)'}
        {...props}
      />
      {error && (
        <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </div>
  );
});
Input.displayName = 'Input';

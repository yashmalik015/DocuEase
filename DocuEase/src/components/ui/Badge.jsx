import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const getStyles = () => {
    switch (variant) {
      case 'success':
      case 'Completed':
        return { bg: 'var(--color-success-bg)', color: 'var(--color-success)' };
      case 'warning':
      case 'Due Soon':
      case 'Needs Review':
        return { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
      case 'danger':
      case 'At Risk':
        return { bg: 'var(--color-danger-bg)', color: 'var(--color-danger)' };
      case 'upcoming':
      case 'Upcoming':
      case 'Active':
        return { bg: 'var(--color-accent-soft)', color: 'var(--color-accent)' };
      default:
        return { bg: 'var(--color-border)', color: 'var(--color-text)' };
    }
  };

  const { bg, color } = getStyles();

  return (
    <span 
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.125rem 0.625rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: bg,
        color: color
      }}
    >
      {children}
    </span>
  );
};

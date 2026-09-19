import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`} style={{ marginBottom: '1rem' }}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`} style={{ fontSize: '1.125rem', fontWeight: 600 }}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

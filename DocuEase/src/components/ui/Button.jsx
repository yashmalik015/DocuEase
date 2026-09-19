import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', style = {}, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#10B981] text-white hover:bg-[#059669]',
    accent: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]',
    outline: 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background)]',
    ghost: 'text-[var(--color-text)] hover:bg-[var(--color-background)]'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg'
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[props.size || 'md'];

  // Manually combining classes since we aren't using tailwind or clsx for simplicity
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        borderRadius: '0.375rem',
        padding: props.size === 'sm' ? '0.5rem 0.75rem' : '0.5rem 1rem',
        border: variant === 'outline' ? '1px solid var(--color-border)' : 'none',
        backgroundColor: variant === 'primary' ? '#10B981' : variant === 'accent' ? 'var(--color-accent)' : variant === 'outline' || variant === 'ghost' ? 'transparent' : '#10B981',
        color: variant === 'outline' || variant === 'ghost' ? 'var(--color-text)' : '#fff',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

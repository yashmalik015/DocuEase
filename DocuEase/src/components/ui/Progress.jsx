import React, { useEffect, useState } from 'react';

export const LineProgress = ({ value, max = 100, color = '#10B981', style = {} }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Small delay to ensure the animation triggers after initial render
    const timer = setTimeout(() => setCurrentValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min(100, Math.max(0, (currentValue / max) * 100));
  
  return (
    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden', ...style }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />
    </div>
  );
};

export const CircularProgress = ({ value, max = 100, size = 60, strokeWidth = 6, color = '#10B981' }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(100, Math.max(0, (currentValue / max) * 100));
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ 
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)', 
            transform: 'rotate(-90deg)', 
            transformOrigin: '50% 50%' 
          }}
        />
      </svg>
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.25,
        fontWeight: 600,
        color: 'var(--color-text)'
      }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

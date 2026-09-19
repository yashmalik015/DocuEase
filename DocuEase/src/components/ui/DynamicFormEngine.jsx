import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

export const DynamicFormEngine = ({ schema, onSubmit, onCancel, isGenerating }) => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {schema.fields.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
                </label>
                <select
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={isGenerating}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="" disabled>Select an option</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
                </label>
                <textarea
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={isGenerating}
                  rows={3}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    resize: 'vertical'
                  }}
                />
              </div>
            );
          }

          return (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleChange}
              disabled={isGenerating}
            />
          );
        })}
      </div>
      
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <Button variant="outline" type="button" onClick={onCancel} disabled={isGenerating}>Cancel</Button>
        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Document'}
        </Button>
      </div>
    </form>
  );
};

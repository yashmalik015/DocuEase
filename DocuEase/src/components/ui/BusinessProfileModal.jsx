import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

// Multi-select helper component
const MultiSelectGrid = ({ options, selected, onChange }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
      {options.map(opt => {
        const isSelected = selected.includes(opt);
        return (
          <label 
            key={opt}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem',
              border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: '0.375rem', cursor: 'pointer',
              backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'var(--color-surface)',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem'
            }}
          >
            <input 
              type="checkbox" 
              checked={isSelected}
              onChange={(e) => {
                if (e.target.checked) onChange([...selected, opt]);
                else onChange(selected.filter(item => item !== opt));
              }}
              style={{ marginTop: '2px', width: '16px', height: '16px' }}
            />
            <span style={{ lineHeight: 1.2 }}>{opt}</span>
          </label>
        );
      })}
    </div>
  );
};

const RadioGroup = ({ label, options, value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
    {label && <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</label>}
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {options.map(opt => (
        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input type="radio" checked={value === opt} onChange={() => onChange(opt)} style={{ width: '16px', height: '16px' }} />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
    {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>{label}</label>}
    <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)', width: '100%' }}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const BusinessProfileModal = ({ isOpen, onClose, business, onUpdate }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    businessName: "",
    entityType: "Private Limited Company",
    industry: "Other",
    businessStartDate: "",
    state: "",
    city: "",
    locationType: "Owned premises",
    
    activities: [],
    
    foodActivities: [],
    manufacturesPackagedFood: 'No',
    sellsFoodDirectly: 'No',
    operatesPhysicalFoodEstablishment: 'No',
    sellsFoodOnline: 'No',
    fssaiRegistered: 'No',
    fssaiNumber: '',
    fssaiType: 'Not sure',
    
    manufacturedProducts: '',
    operatesFactory: 'No',
    manufacturingWorkers: '0',
    usesIndustrialMachinery: 'No',
    handlesHazardousMaterials: 'Not sure',
    generatesIndustrialWaste: 'Not sure',
    existingFactoryLicences: 'Not sure',

    annualTurnover: 'Under ₹10 Lakhs',
    employeeCount: '0',
    workforceTypes: [],
    multipleLocations: 'No',
    contractWorkers: 'No',
    employeesInMultipleStates: 'No',
    employeeRegistrations: 'No',
    labourRegistrations: [],
    
    salesChannels: [],
    sellsOutsideState: 'Not sure',
    sellsOutsideIndia: 'Not sure',
    
    gstRegistered: 'Not sure',
    gstin: '',
    gstRegistrationDate: '',
    gstTaxpayerType: 'Regular',
    
    importsGoods: 'No',
    exportsGoods: 'No',
    exportsServices: 'No',
    hasIEC: 'Not sure',
    tradeCountries: '',

    existingRegistrations: [],
    
    complianceConfidence: 'I am not sure what applies to my business',
    documentAvailability: 'I don\'t know what documents I need'
  });

  useEffect(() => {
    if (business && isOpen) {
      setProfile(prev => ({
        ...prev,
        ...business,
        businessName: business.name || prev.businessName,
        industry: business.type || prev.industry,
        entityType: business.entity || prev.entityType,
        annualTurnover: business.turnover || prev.annualTurnover,
        employeeCount: business.employees || prev.employeeCount,
      }));
      setStep(1);
    }
  }, [business, isOpen]);

  const update = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1 && !profile.businessName) return alert('Business Name is required.');
    setStep(s => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    // Construct final format expected by parent
    onUpdate({
      ...profile,
      name: profile.businessName,
      type: profile.industry,
      entity: profile.entityType,
      turnover: profile.annualTurnover,
      employees: profile.employeeCount
    });
  };

  const isFood = profile.activities.some(a => ['Handle food', 'Process food', 'Package food', 'Operate a restaurant/cafe'].includes(a)) || profile.industry === 'Food & Beverage';
  const isManufacturing = profile.activities.includes('Manufacture products');
  const hasEmployees = !['0', 'Not sure'].includes(profile.employeeCount);
  const isImportExport = profile.activities.some(a => ['Import goods', 'Export goods/services'].includes(a));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Business Profile" maxWidth="800px">
      
      {/* Progress Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-muted)' }}>
        {['Business', 'Activities', 'Size', 'Registrations', 'Review'].map((label, idx) => {
          const s = idx + 1;
          const isActive = step === s;
          const isPast = step > s;
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isActive || isPast ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isActive || isPast ? 'var(--color-primary)' : 'var(--color-border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                  {isPast ? <CheckCircle2 size={14} /> : s}
                </div>
                <span style={{ display: 'none', '@media (minWidth: 600px)': { display: 'inline' } }}>{label}</span>
              </div>
              {idx < 4 && <div style={{ flex: 1, height: '2px', margin: '0 0.5rem', backgroundColor: isPast ? 'var(--color-primary)' : 'var(--color-border)' }} />}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', margin: '0 -1rem', padding: '0 1rem' }}>
        
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Tell us about your business</h2>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>This helps DocuEase understand which compliance areas may apply to your business.</p>
            </div>
            
            <Input label="1. Business Name *" required placeholder="e.g. Optixi Media" value={profile.businessName} onChange={e => update('businessName', e.target.value)} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Select 
                label="2. Entity Type" 
                value={profile.entityType} onChange={v => update('entityType', v)}
                options={['Sole Proprietorship', 'Partnership', 'Limited Liability Partnership (LLP)', 'Private Limited Company', 'Public Limited Company', 'One Person Company (OPC)', 'HUF', 'Trust', 'Society', 'Other', 'Not sure']}
              />
              <Select 
                label="3. Industry / Sector" 
                value={profile.industry} onChange={v => update('industry', v)}
                options={['Food & Beverage', 'Retail', 'Wholesale', 'Manufacturing', 'IT / Software', 'Professional Services', 'Healthcare', 'Education', 'Construction', 'Real Estate', 'Logistics / Transport', 'E-commerce', 'Hospitality', 'Agriculture', 'Financial Services', 'Other']}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="4. Business Start Date" type="date" value={profile.businessStartDate} onChange={e => update('businessStartDate', e.target.value)} />
              <Input label="5. State" placeholder="e.g. Maharashtra" value={profile.state} onChange={e => update('state', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="6. City" placeholder="e.g. Mumbai" value={profile.city} onChange={e => update('city', e.target.value)} />
              <Select 
                label="7. Business Location Type" 
                value={profile.locationType} onChange={v => update('locationType', v)}
                options={['Owned premises', 'Rented premises', 'Home-based', 'Shared / Co-working', 'Multiple locations', 'Other']}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>What does your business actually do?</h2>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Select everything that applies.</p>
            </div>

            <MultiSelectGrid 
              options={['Manufacture products', 'Sell products', 'Wholesale', 'Retail', 'Provide services', 'Sell online', 'Sell through marketplaces', 'Import goods', 'Export goods/services', 'Store goods', 'Transport goods', 'Handle food', 'Process food', 'Package food', 'Operate a restaurant/cafe', 'Provide professional services', 'Employ workers', 'Other', 'Not sure']}
              selected={profile.activities}
              onChange={v => update('activities', v)}
            />

            {isFood && (
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#B45309' }}>Food business details</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', fontWeight: 500 }}>What type of food activity do you perform?</p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <MultiSelectGrid 
                    options={['Restaurant', 'Cafe', 'Cloud kitchen', 'Catering', 'Food manufacturing', 'Food processing', 'Food packaging', 'Food storage', 'Food distribution', 'Food wholesale', 'Food retail', 'Bakery', 'Other']}
                    selected={profile.foodActivities}
                    onChange={v => update('foodActivities', v)}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <RadioGroup label="Do you manufacture/process packaged food?" options={['Yes', 'No']} value={profile.manufacturesPackagedFood} onChange={v => update('manufacturesPackagedFood', v)} />
                  <RadioGroup label="Do you sell food directly to customers?" options={['Yes', 'No']} value={profile.sellsFoodDirectly} onChange={v => update('sellsFoodDirectly', v)} />
                  <RadioGroup label="Operate physical food establishment?" options={['Yes', 'No']} value={profile.operatesPhysicalFoodEstablishment} onChange={v => update('operatesPhysicalFoodEstablishment', v)} />
                  <RadioGroup label="Do you sell food online?" options={['Yes', 'No']} value={profile.sellsFoodOnline} onChange={v => update('sellsFoodOnline', v)} />
                  <RadioGroup label="Existing FSSAI registration?" options={['Yes', 'No', 'Not sure']} value={profile.fssaiRegistered} onChange={v => update('fssaiRegistered', v)} />
                </div>
                
                {profile.fssaiRegistered === 'Yes' && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Input label="FSSAI Number" value={profile.fssaiNumber} onChange={e => update('fssaiNumber', e.target.value)} />
                    <Select label="Licence Type" value={profile.fssaiType} onChange={v => update('fssaiType', v)} options={['Not sure', 'Basic', 'State', 'Central']} />
                  </div>
                )}
              </div>
            )}

            {isManufacturing && (
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#1D4ED8' }}>Manufacturing details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Input label="What do you manufacture?" placeholder="e.g. Textiles, Electronics" value={profile.manufacturedProducts} onChange={e => update('manufacturedProducts', e.target.value)} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <RadioGroup label="Operate a factory premises?" options={['Yes', 'No']} value={profile.operatesFactory} onChange={v => update('operatesFactory', v)} />
                    <Select label="Approx factory workers" value={profile.manufacturingWorkers} onChange={v => update('manufacturingWorkers', v)} options={['0', '1-5', '6-10', '11-20', '21-50', '51-100', '100+']} />
                    <RadioGroup label="Use industrial machinery?" options={['Yes', 'No']} value={profile.usesIndustrialMachinery} onChange={v => update('usesIndustrialMachinery', v)} />
                    <RadioGroup label="Handle hazardous materials?" options={['Yes', 'No', 'Not sure']} value={profile.handlesHazardousMaterials} onChange={v => update('handlesHazardousMaterials', v)} />
                    <RadioGroup label="Generate industrial waste?" options={['Yes', 'No', 'Not sure']} value={profile.generatesIndustrialWaste} onChange={v => update('generatesIndustrialWaste', v)} />
                    <RadioGroup label="Existing factory licences?" options={['Yes', 'No', 'Not sure']} value={profile.existingFactoryLicences} onChange={v => update('existingFactoryLicences', v)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Tell us about your business size</h2>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Financial and workforce information.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Select label="1. Estimated Annual Turnover" value={profile.annualTurnover} onChange={v => update('annualTurnover', v)} options={['Under ₹10 Lakhs', '₹10 Lakhs - ₹20 Lakhs', '₹20 Lakhs - ₹50 Lakhs', '₹50 Lakhs - ₹1 Crore', '₹1 Crore - ₹5 Crore', '₹5 Crore - ₹10 Crore', '₹10 Crore - ₹50 Crore', 'Above ₹50 Crore', 'Not sure']} />
              <Select label="2. Number of Employees" value={profile.employeeCount} onChange={v => update('employeeCount', v)} options={['0', '1-5', '6-10', '11-20', '21-50', '51-100', '100+']} />
            </div>

            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>3. Workforce type</p>
              <MultiSelectGrid 
                options={['Full-time employees', 'Part-time employees', 'Contract workers', 'Temporary workers', 'Apprentices', 'No employees', 'Not sure']}
                selected={profile.workforceTypes} onChange={v => update('workforceTypes', v)}
              />
            </div>

            <RadioGroup label="4. Do you operate in more than one location?" options={['Yes', 'No']} value={profile.multipleLocations} onChange={v => update('multipleLocations', v)} />

            {hasEmployees && (
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#047857' }}>Workforce details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <RadioGroup label="Employ contract workers?" options={['Yes', 'No']} value={profile.contractWorkers} onChange={v => update('contractWorkers', v)} />
                  <RadioGroup label="Employees in different states?" options={['Yes', 'No', 'Not sure']} value={profile.employeesInMultipleStates} onChange={v => update('employeesInMultipleStates', v)} />
                  <RadioGroup label="Existing labour registrations?" options={['Yes', 'No', 'Not sure']} value={profile.employeeRegistrations} onChange={v => update('employeeRegistrations', v)} />
                </div>
                {profile.employeeRegistrations === 'Yes' && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Select existing registrations:</p>
                    <MultiSelectGrid options={['Provident Fund / EPFO', 'ESI', 'Professional Tax', 'Labour-related registration', 'Other', 'Not sure']} selected={profile.labourRegistrations} onChange={v => update('labourRegistrations', v)} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Sales */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>How do you sell?</h2>
              <MultiSelectGrid options={['Physical store', 'Website', 'Amazon', 'Flipkart', 'Other marketplace', 'Social media', 'WhatsApp', 'B2B', 'Direct sales', 'Export', 'Other']} selected={profile.salesChannels} onChange={v => update('salesChannels', v)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <RadioGroup label="Sell outside your state?" options={['Yes', 'No', 'Not sure']} value={profile.sellsOutsideState} onChange={v => update('sellsOutsideState', v)} />
                <RadioGroup label="Sell outside India?" options={['Yes', 'No', 'Not sure']} value={profile.sellsOutsideIndia} onChange={v => update('sellsOutsideIndia', v)} />
              </div>
            </div>

            {/* GST */}
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>GST information</h3>
              <RadioGroup label="Is your business registered under GST?" options={['Yes', 'No', 'Not sure']} value={profile.gstRegistered} onChange={v => update('gstRegistered', v)} />
              
              {profile.gstRegistered === 'Yes' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                  <Input label="GSTIN" value={profile.gstin} onChange={e => update('gstin', e.target.value)} />
                  <Input label="Registration Date" type="date" value={profile.gstRegistrationDate} onChange={e => update('gstRegistrationDate', e.target.value)} />
                  <Select label="Taxpayer Type" value={profile.gstTaxpayerType} onChange={v => update('gstTaxpayerType', v)} options={['Regular', 'Composition', 'Other', 'Not sure']} />
                </div>
              )}
            </div>

            {/* Import/Export */}
            {isImportExport && (
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Import & Export</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <RadioGroup label="Do you import goods?" options={['Yes', 'No']} value={profile.importsGoods} onChange={v => update('importsGoods', v)} />
                  <RadioGroup label="Do you export goods?" options={['Yes', 'No']} value={profile.exportsGoods} onChange={v => update('exportsGoods', v)} />
                  <RadioGroup label="Do you export services?" options={['Yes', 'No']} value={profile.exportsServices} onChange={v => update('exportsServices', v)} />
                  <RadioGroup label="Do you already have an IEC?" options={['Yes', 'No', 'Not sure']} value={profile.hasIEC} onChange={v => update('hasIEC', v)} />
                </div>
                <Input label="Countries you commonly trade with" placeholder="e.g. USA, Dubai" value={profile.tradeCountries} onChange={e => update('tradeCountries', e.target.value)} />
              </div>
            )}

            {/* Registrations */}
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>What registrations or licences do you already have?</h3>
              <MultiSelectGrid 
                options={['GST', 'FSSAI', 'Udyam / MSME', 'Shops & Establishment', 'Professional Tax', 'IEC', 'Trade Licence', 'Factory Licence', 'EPFO', 'ESIC', 'Pollution-related approval', 'Fire-related approval', 'Local municipal licence', 'Other', 'None', 'Not sure']} 
                selected={profile.existingRegistrations} onChange={v => update('existingRegistrations', v)} 
              />
            </div>

            {/* Compliance Status */}
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>How confident are you about your current compliance?</h3>
              <Select value={profile.complianceConfidence} onChange={v => update('complianceConfidence', v)} options={['I manage everything myself', 'I have a CA/professional', 'I have an internal compliance person', 'I use multiple professionals', 'I am not sure what applies to my business', 'I am just getting started']} />
            </div>

          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Review your business profile</h2>
              <p className="text-muted">Ready to analyse your compliance profile?</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>Business <span style={{ fontSize: '0.75rem', cursor: 'pointer', color: 'var(--color-primary)' }} onClick={() => setStep(1)}>Edit</span></h4>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Name:</span> {profile.businessName}</p>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Entity:</span> {profile.entityType}</p>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Industry:</span> {profile.industry}</p>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Location:</span> {profile.city}, {profile.state}</p>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>Size & Workforce <span style={{ fontSize: '0.75rem', cursor: 'pointer', color: 'var(--color-primary)' }} onClick={() => setStep(3)}>Edit</span></h4>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Turnover:</span> {profile.annualTurnover}</p>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Employees:</span> {profile.employeeCount}</p>
                <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>Multi-location:</span> {profile.multipleLocations}</p>
              </div>
            </div>

            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>Operations <span style={{ fontSize: '0.75rem', cursor: 'pointer', color: 'var(--color-primary)' }} onClick={() => setStep(2)}>Edit</span></h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {profile.activities.map(a => <span key={a} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-background)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>{a}</span>)}
                {profile.activities.length === 0 && <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>None selected</span>}
              </div>
            </div>
            
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>Compliance & Tax <span style={{ fontSize: '0.75rem', cursor: 'pointer', color: 'var(--color-primary)' }} onClick={() => setStep(4)}>Edit</span></h4>
              <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>GST Registered:</span> {profile.gstRegistered}</p>
              <p style={{ fontSize: '0.875rem' }}><span style={{ color: 'var(--color-muted)' }}>FSSAI Registered:</span> {profile.fssaiRegistered}</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}><span style={{ color: 'var(--color-muted)' }}>Existing Registrations:</span> {profile.existingRegistrations.join(', ') || 'None'}</p>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ChevronLeft size={16} /> Back</Button>
        ) : <div />}
        
        {step < 5 ? (
          <Button onClick={handleNext} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Next <ChevronRight size={16} /></Button>
        ) : (
          <Button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} /> Analyse My Business</Button>
        )}
      </div>
    </Modal>
  );
};

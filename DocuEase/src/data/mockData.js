export const mockUser = {
  id: 'u_1',
  name: 'Shubham Vats',
  email: 'shubham@vatsfoods.com',
  businessName: 'Vats Foods & Retail',
  role: 'Owner'
};

export const mockCompliances = [
  {
    id: 'c_1',
    title: 'GST Return (GSTR-3B)',
    category: 'Tax',
    status: 'Due Soon',
    deadline: '2026-09-20',
    priority: 'High',
    owner: 'Business Owner',
    description: 'Monthly summary return of outward and inward supplies.',
    whatIsThis: 'GSTR-3B is a monthly self-declaration to be filed by a registered GST dealer along with GSTR-1 and GSTR-2 return forms. It is a simplified return to declare summary GST liabilities for a tax period.',
    whyMatters: 'Failing to file GSTR-3B attracts a late fee and interest on the outstanding tax amount.',
    documentsNeeded: ['Sales Invoices', 'Purchase Invoices (ITC)'],
    nextStep: 'Upload your sales and purchase data to calculate the liability.',
    isDrafted: true,
    estimatedFee: 1500
  },
  {
    id: 'c_2',
    title: 'FSSAI License Renewal',
    category: 'License',
    status: 'Upcoming',
    deadline: '2026-10-04',
    priority: 'Medium',
    owner: 'CA / Professional',
    description: 'Annual renewal of Food Safety and Standards Authority of India license.',
    whatIsThis: 'Any food business operator requires an FSSAI license to legally operate in India. Licenses must be renewed periodically.',
    whyMatters: 'Operating without a valid FSSAI license is illegal and can lead to heavy penalties or business closure.',
    documentsNeeded: ['Current FSSAI License', 'ID Proof', 'Premises Proof'],
    nextStep: 'Contact your CA to initiate the renewal process.',
    isDrafted: false,
    estimatedFee: 3500
  },
  {
    id: 'c_3',
    title: 'Professional Tax Return',
    category: 'Tax',
    status: 'Completed',
    deadline: '2026-10-10',
    priority: 'Low',
    owner: 'CA / Professional',
    description: 'State-level tax on professions, trades, callings and employments.',
    whatIsThis: 'Professional tax is a tax levied by state governments on individuals employed in government and non-government sectors, or practicing any profession.',
    whyMatters: 'Required compliance in applicable states.',
    documentsNeeded: ['Salary Details'],
    nextStep: 'None. Completed.',
    isDrafted: true,
    estimatedFee: 500
  }
];

export const mockNotices = [
  {
    id: 'n_1',
    title: 'GST Notice - Discrepancy in ITC',
    date: '2026-09-12',
    source: 'GST Department',
    priority: 'High',
    status: 'Needs Review',
    summary: 'A discrepancy was found between the Input Tax Credit claimed in GSTR-3B and GSTR-2A.',
    recommendedStep: 'Review the ITC matching report and consult with your CA to file a reply.'
  }
];

export const mockProfessionals = [
  {
    id: 'p_1',
    name: 'Anjali Sharma',
    qualification: 'Chartered Accountant',
    specialisation: 'GST & Income Tax',
    experience: '8 years',
    location: 'Delhi NCR',
    rating: 4.8,
    casesHandled: 340,
    availability: 'Available'
  },
  {
    id: 'p_2',
    name: 'Rajeev Kumar',
    qualification: 'Legal Advisor',
    specialisation: 'FSSAI & Licensing',
    experience: '12 years',
    location: 'Haryana',
    rating: 4.9,
    casesHandled: 512,
    availability: 'Busy'
  }
];

export const mockDocuments = [
  {
    id: 'd_1',
    filename: 'FSSAI_License_2025.pdf',
    type: 'License',
    uploadedAt: '2025-10-01',
    relatedCompliance: 'FSSAI Renewal',
    status: 'Active'
  },
  {
    id: 'd_2',
    filename: 'August_2026_Invoices.zip',
    type: 'Invoices',
    uploadedAt: '2026-09-05',
    relatedCompliance: 'GST Return',
    status: 'Archived'
  }
];

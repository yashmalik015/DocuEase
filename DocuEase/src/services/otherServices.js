import { mockNotices, mockProfessionals } from '../data/mockData';
import { authService } from './authService';

export const noticeService = {
  getAll: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const business = authService.getActiveBusiness();
        const isTech = business?.industry === 'IT / Software' || business?.activities?.includes('Provide services');
        const isFood = business?.industry === 'Food & Beverage' || business?.activities?.includes('Handle food') || business?.activities?.includes('Process food');

        if (isTech) {
          resolve([
            {
              id: 'n_1',
              title: 'CERT-In Cybersecurity Directive',
              date: '2026-09-15',
              source: 'MeitY / CERT-In',
              priority: 'High',
              status: 'Needs Review',
              summary: 'New directive requires all SaaS providers to report cybersecurity incidents within 6 hours.',
              recommendedStep: 'Review your incident response SLA and consult legal counsel.'
            }
          ]);
        } else if (isFood) {
          resolve([
            {
              id: 'n_1',
              title: 'FSSAI Notice - Labeling Norms',
              date: '2026-09-12',
              source: 'FSSAI Department',
              priority: 'High',
              status: 'Needs Review',
              summary: 'Upcoming changes to nutritional information display requirements for packaged foods.',
              recommendedStep: 'Review packaging templates against the new guidelines.'
            }
          ]);
        } else {
          resolve(mockNotices);
        }
      }, 300);
    });
  }
};

export const professionalService = {
  getAll: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockProfessionals), 300);
    });
  }
};

export const scannerService = {
  analyzeDocument: async (file) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const business = authService.getActiveBusiness();
        const isTech = business?.industry === 'IT / Software' || business?.activities?.includes('Provide services');
        const isFood = business?.industry === 'Food & Beverage' || business?.activities?.includes('Handle food') || business?.activities?.includes('Process food');

        if (isTech) {
          resolve({
            summary: "This appears to be a Master Service Agreement (MSA) or Data Privacy Policy draft.",
            issues: ["Missing GDPR compliance clause for EU users.", "Limitation of liability is not capped appropriately."],
            importantDates: ["15 Nov 2026 - Target execution date"],
            missingInfo: ["No signature blocks detected."],
            recommendedStep: "Review the liability clauses and add standard GDPR data processing addendums."
          });
        } else if (isFood) {
          resolve({
            summary: "This appears to be a Food Safety and Standards Authority of India (FSSAI) License document.",
            issues: ["Your FSSAI licence appears to be approaching its renewal date."],
            importantDates: ["04 Oct 2026 - Renewal Deadline"],
            missingInfo: ["No recent inspection report attached."],
            recommendedStep: "Review renewal requirements and contact a qualified professional if needed."
          });
        } else {
          resolve({
            summary: "This appears to be a standard Goods and Services Tax (GST) Registration Certificate.",
            issues: ["The business address listed differs slightly from your profile."],
            importantDates: ["20 Sep 2026 - Next GSTR-3B filing due"],
            missingInfo: ["No recent filing history attached."],
            recommendedStep: "Update your address in the GST portal to match your official registered premises."
          });
        }
      }, 1500);
    });
  }
};

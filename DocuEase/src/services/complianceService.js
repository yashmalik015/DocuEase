import { mockCompliances } from '../data/mockData';
import { authService } from './authService';

const COMPLIANCES_KEY = 'docuease_compliances_v2'; // new key for the new schema

export const complianceService = {
  getAll: async (businessId) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        let allData = JSON.parse(localStorage.getItem(COMPLIANCES_KEY) || '{}');
        const targetBusinessId = businessId || authService.getActiveBusiness()?.id;
        
        if (!targetBusinessId) {
          resolve([]);
          return;
        }

        if (!allData[targetBusinessId]) {
           const business = authService.getBusinesses().find(b => b.id === targetBusinessId);
           
           try {
             const API_BASE = import.meta.env.VITE_API_URL || '';
             const response = await fetch(`${API_BASE}/api/analyze-business`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(business)
             });
             
             if (!response.ok) {
               const errData = await response.json().catch(() => ({}));
               throw new Error(errData.error || `HTTP error ${response.status}`);
             }
             
             const data = await response.json();
             if (Array.isArray(data)) {
               const finalGenerated = data.map((item, index) => ({
                 ...item,
                 id: item.id || `c_gen_${Date.now()}_${index}`,
                 isDrafted: item.isDrafted || false
               }));
               allData[targetBusinessId] = finalGenerated;
             } else {
               allData[targetBusinessId] = [];
             }
           } catch (err) {
             console.error("Backend AI Error:", err);
             // Fallback if backend is down or errors out, show it in the UI!
             allData[targetBusinessId] = [{
               id: 'error-' + Date.now(),
               title: 'System Error: Analysis Failed',
               category: 'Error',
               status: 'At Risk',
               deadline: new Date().toISOString().split('T')[0],
               priority: 'High',
               description: err.message,
               applicabilityReason: 'Please ensure GEMINI_API_KEY is added to Vercel Environment Variables and deployed.',
               isDrafted: false
             }];
           }
        }
        resolve(allData[targetBusinessId]);
      }, 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allData = JSON.parse(localStorage.getItem(COMPLIANCES_KEY) || '{}');
        for (const bizId in allData) {
          const found = allData[bizId].find(c => c.id === id);
          if (found) {
            resolve(found);
            return;
          }
        }
        resolve(null);
      }, 300);
    });
  },

  updateStatus: async (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allData = JSON.parse(localStorage.getItem(COMPLIANCES_KEY) || '{}');
        let updatedItem = null;
        for (const bizId in allData) {
          allData[bizId] = allData[bizId].map(c => {
            if (c.id === id) {
              updatedItem = { ...c, status };
              return updatedItem;
            }
            return c;
          });
        }
        localStorage.setItem(COMPLIANCES_KEY, JSON.stringify(allData));
        resolve(updatedItem);
      }, 300);
    });
  },

  refreshForBusiness: (businessId) => {
    let allData = JSON.parse(localStorage.getItem(COMPLIANCES_KEY) || '{}');
    delete allData[businessId];
    localStorage.setItem(COMPLIANCES_KEY, JSON.stringify(allData));
  }
};

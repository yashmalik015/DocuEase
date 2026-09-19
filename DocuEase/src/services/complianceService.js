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
               body: JSON.stringify(business || {})
             });
             
             if (!response.ok) throw new Error('Failed to analyze business');
             
             const generated = await response.json();
             
             // Ensure IDs are unique if backend didn't provide good ones
             const finalGenerated = generated.map((item, index) => ({
               ...item,
               id: item.id || `c_gen_${Date.now()}_${index}`,
               isDrafted: item.isDrafted || false
             }));

             allData[targetBusinessId] = finalGenerated;
             localStorage.setItem(COMPLIANCES_KEY, JSON.stringify(allData));
           } catch (err) {
             console.error("Backend AI Error:", err);
             // Fallback if backend is down
             allData[targetBusinessId] = [];
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

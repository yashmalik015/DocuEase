import { authService } from './authService';

const DOCS_KEY = 'docuease_documents_v3'; // new key to reset state

export const documentService = {
  getAll: async (businessId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allData = JSON.parse(localStorage.getItem(DOCS_KEY) || '{}');
        const targetBusinessId = businessId || authService.getActiveBusiness()?.id;
        
        if (!targetBusinessId) {
          resolve([]);
          return;
        }

        if (!allData[targetBusinessId]) {
           allData[targetBusinessId] = [];
           localStorage.setItem(DOCS_KEY, JSON.stringify(allData));
        }
        resolve(allData[targetBusinessId]);
      }, 300);
    });
  },

  upload: async (fileDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allData = JSON.parse(localStorage.getItem(DOCS_KEY) || '{}');
        const targetBusinessId = authService.getActiveBusiness()?.id;
        
        if (!targetBusinessId) return resolve(null);
        if (!allData[targetBusinessId]) allData[targetBusinessId] = [];

        const newDoc = {
          ...fileDetails,
          id: 'd_' + Date.now(),
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'Active'
        };
        allData[targetBusinessId].push(newDoc);
        localStorage.setItem(DOCS_KEY, JSON.stringify(allData));
        resolve(newDoc);
      }, 800);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allData = JSON.parse(localStorage.getItem(DOCS_KEY) || '{}');
        for (const bizId in allData) {
          allData[bizId] = allData[bizId].filter(d => d.id !== id);
        }
        localStorage.setItem(DOCS_KEY, JSON.stringify(allData));
        resolve(true);
      }, 300);
    });
  },

  refreshForBusiness: (businessId) => {
    let allData = JSON.parse(localStorage.getItem(DOCS_KEY) || '{}');
    delete allData[businessId];
    localStorage.setItem(DOCS_KEY, JSON.stringify(allData));
  }
};

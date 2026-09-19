import { mockUser } from '../data/mockData';

const AUTH_KEY = 'docuease_auth_state';
const USER_KEY = 'docuease_user_data';
const BUSINESSES_KEY = 'docuease_businesses';
const ACTIVE_BUSINESS_KEY = 'docuease_active_business';

export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          localStorage.setItem(AUTH_KEY, 'true');
          const namePrefix = email.split('@')[0];
          const dynamicName = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);
          const loggedInUser = { ...mockUser, name: dynamicName, email: email };
          localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
          
          // Init mock businesses if not present
          if (!localStorage.getItem(BUSINESSES_KEY)) {
            const initialBusinesses = [
              { id: 'b1', name: `${dynamicName} Foods Mfg`, type: 'Food Manufacturing', location: 'Sonipat, HR' },
              { id: 'b2', name: `${dynamicName} Retail Hub`, type: 'Retail & Distribution', location: 'Panipat, HR' }
            ];
            localStorage.setItem(BUSINESSES_KEY, JSON.stringify(initialBusinesses));
          }
          resolve(loggedInUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },
  
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(AUTH_KEY, 'true');
        const newUser = { ...mockUser, ...userData, id: 'u_' + Date.now() };
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        
        // Init with one business from signup
        if (userData.businessName) {
          const initialBusinesses = [
            { id: 'b_' + Date.now(), name: userData.businessName, type: 'General', location: 'India' }
          ];
          localStorage.setItem(BUSINESSES_KEY, JSON.stringify(initialBusinesses));
        }
        resolve(newUser);
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(BUSINESSES_KEY);
    localStorage.removeItem(ACTIVE_BUSINESS_KEY);
  },

  isAuthenticated: () => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  getCurrentUser: () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  getBusinesses: () => {
    const data = localStorage.getItem(BUSINESSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addBusiness: (business) => {
    const businesses = authService.getBusinesses();
    const newBusiness = { ...business, id: 'b_' + Date.now() };
    businesses.push(newBusiness);
    localStorage.setItem(BUSINESSES_KEY, JSON.stringify(businesses));
    return newBusiness;
  },

  setActiveBusiness: (id) => {
    localStorage.setItem(ACTIVE_BUSINESS_KEY, id);
  },

  getActiveBusiness: () => {
    const id = localStorage.getItem(ACTIVE_BUSINESS_KEY);
    const businesses = authService.getBusinesses();
    return businesses.find(b => b.id === id) || businesses[0] || null;
  },

  updateBusiness: (id, updates) => {
    let businesses = authService.getBusinesses();
    businesses = businesses.map(b => b.id === id ? { ...b, ...updates } : b);
    localStorage.setItem(BUSINESSES_KEY, JSON.stringify(businesses));
    return businesses.find(b => b.id === id);
  }
};

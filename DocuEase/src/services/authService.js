const TOKEN_KEY = 'docuease_token';
const USER_KEY = 'docuease_user_data';
// Business data still lives in localStorage for now (the data-layer migration
// is a later step). We namespace it per user id so one user can no longer see
// another user's businesses on the same browser.
const businessesKey = (userId) => `docuease_businesses_${userId || 'anon'}`;
const activeBusinessKey = (userId) => `docuease_active_business_${userId || 'anon'}`;

const API_BASE = import.meta.env.VITE_API_URL || '';

async function api(path, body) {
  const res = await fetch(`${API_BASE}/api/auth${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Surface the server's message (e.g. "Invalid email or password").
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const authService = {
  login: async (email, password) => {
    const { token, user } = await api('/login', { email, password });
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    authService._seedBusinessesIfEmpty(user);
    return user;
  },

  signup: async (userData) => {
    // userData: { name, email, password, role, businessName? }
    const { token, user } = await api('/signup', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Seed the first business from the signup form, keyed to this user.
    if (userData.businessName) {
      localStorage.setItem(
        businessesKey(user._id),
        JSON.stringify([
          { id: 'b_' + Date.now(), name: userData.businessName, type: 'General', location: 'India' },
        ])
      );
    }
    return user;
  },

  logout: () => {
    const user = authService.getCurrentUser();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    if (user) {
      localStorage.removeItem(businessesKey(user._id));
      localStorage.removeItem(activeBusinessKey(user._id));
    }
  },

  // Token presence is enough for routing/UX. Real security is enforced by the
  // server, which verifies the token on every protected request.
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),

  getToken: () => localStorage.getItem(TOKEN_KEY),

  // Helper for other services to authenticate their API calls.
  authHeader: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  getCurrentUser: () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  // ---- Business helpers (still localStorage-backed, now per-user) ----

  _seedBusinessesIfEmpty: (user) => {
    if (!user) return;
    if (!localStorage.getItem(businessesKey(user._id))) {
      const initial = [
        { id: 'b_' + Date.now() + '_1', name: `${user.name} Foods Mfg`, type: 'Food Manufacturing', location: 'Sonipat, HR' },
        { id: 'b_' + Date.now() + '_2', name: `${user.name} Retail Hub`, type: 'Retail & Distribution', location: 'Panipat, HR' },
      ];
      localStorage.setItem(businessesKey(user._id), JSON.stringify(initial));
    }
  },

  getBusinesses: () => {
    const user = authService.getCurrentUser();
    const data = localStorage.getItem(businessesKey(user?._id));
    return data ? JSON.parse(data) : [];
  },

  addBusiness: (business) => {
    const user = authService.getCurrentUser();
    const businesses = authService.getBusinesses();
    const newBusiness = { ...business, id: 'b_' + Date.now() };
    businesses.push(newBusiness);
    localStorage.setItem(businessesKey(user?._id), JSON.stringify(businesses));
    return newBusiness;
  },

  setActiveBusiness: (id) => {
    const user = authService.getCurrentUser();
    localStorage.setItem(activeBusinessKey(user?._id), id);
  },

  getActiveBusiness: () => {
    const user = authService.getCurrentUser();
    const id = localStorage.getItem(activeBusinessKey(user?._id));
    const businesses = authService.getBusinesses();
    return businesses.find((b) => b.id === id) || businesses[0] || null;
  },

  updateBusiness: (id, updates) => {
    const user = authService.getCurrentUser();
    let businesses = authService.getBusinesses();
    businesses = businesses.map((b) => (b.id === id ? { ...b, ...updates } : b));
    localStorage.setItem(businessesKey(user?._id), JSON.stringify(businesses));
    return businesses.find((b) => b.id === id);
  },
};

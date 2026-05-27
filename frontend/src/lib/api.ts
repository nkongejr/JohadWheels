import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('johad_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('johad_token');
        localStorage.removeItem('johad_user');
      }
    }
    return Promise.reject(error);
  },
);

// Cars API
export const carsApi = {
  getAll: (params?: any) => api.get('/cars', { params }),
  getFeatured: () => api.get('/cars/featured'),
  getLuxury: () => api.get('/cars/luxury'),
  getOne: (id: string) => api.get(`/cars/${id}`),
  getBrands: () => api.get('/cars/brands'),
  getTypes: () => api.get('/cars/types'),
  getStats: () => api.get('/cars/stats'),
  create: (data: any) => api.post('/cars', data),
  update: (id: string, data: any) => api.put(`/cars/${id}`, data),
  delete: (id: string) => api.delete(`/cars/${id}`),
  seed: () => api.get('/cars/seed'),
  uploadImages: (formData: FormData) =>
    api.post('/cars/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  markAsSold: (id: string) => api.patch(`/cars/${id}/sold`),
  markAsAvailable: (id: string) => api.patch(`/cars/${id}/available`),

};

// Auth API
// export const authApi = {
//   login: (data: any) => api.post('/auth/login', data),
//   register: (data: any) => api.post('/auth/register', data),
//   getProfile: () => api.get('/auth/profile'),
//   setupAdmin: () => api.get('/auth/setup-admin'),
// };
// src/lib/api.ts  ← update only authApi
export const authApi = {
  // username-based login
  login: (data: { username?: string; email?: string; password: string }) =>
    api.post('/auth/login', data),

  register: (data: any) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  setupAdmin: () => api.get('/auth/setup-admin'),
};

// Contact API
export const contactApi = {
  send: (data: any) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  updateStatus: (id: string, data: any) => api.put(`/contact/${id}`, data),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (email: string) =>
    api.post('/newsletter/subscribe', { email }),
  getCount: () => api.get('/newsletter/count'),
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  create: (data: any) => api.post('/testimonials', data),
  update: (id: string, data: any) => api.put(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
  seed: () => api.get('/testimonials/seed'),
};

// Stats API
export const statsApi = {
  getPublic: () => api.get('/stats/public'),
  getDashboard: () => api.get('/stats/dashboard'),
};

export default api;
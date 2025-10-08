// API service for communicating with backend
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Health check
  async getHealth() {
    const response = await api.get('/health');
    return response.data;
  },

  // App info
  async getAppInfo() {
    const response = await api.get('/info');
    return response.data;
  },

  // User profile
  async getUserProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateUserProfile(profileData: any) {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // Categories
  async getCategories(language: string = 'ru') {
    const response = await api.get(`/categories?lang=${language}`);
    return response.data;
  },

  async getActiveCategories(language: string = 'ru') {
    const response = await api.get(`/categories/active?lang=${language}`);
    return response.data;
  },

  async getCategoryById(id: number, language: string = 'ru') {
    const response = await api.get(`/categories/${id}?lang=${language}`);
    return response.data;
  },

  async getCategoryByName(name: string, language: string = 'ru') {
    const response = await api.get(`/categories/name/${encodeURIComponent(name)}?lang=${language}`);
    return response.data;
  },

  async createCategory(categoryData: any) {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  async updateCategory(id: number, categoryData: any) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id: number) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  async searchCategories(query: string, language: string = 'ru') {
    const response = await api.get(`/categories/search?q=${encodeURIComponent(query)}&lang=${language}`);
    return response.data;
  },

  async searchActiveCategories(query: string, language: string = 'ru') {
    const response = await api.get(`/categories/search/active?q=${encodeURIComponent(query)}&lang=${language}`);
    return response.data;
  },

  // Users/Executors
  async getExecutors() {
    const response = await api.get('/users/executors');
    return response.data;
  },

  async getExecutorsByCategory(categoryId: number) {
    const response = await api.get(`/users/by-category/${categoryId}`);
    return response.data;
  },

  // Authentication
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  },

  async register(email: string, password: string, name: string) {
    const response = await api.post('/auth/register', {
      email,
      password,
      name
    });
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // User categories
  async getUserCategories(userId: number) {
    const response = await api.get(`/users/${userId}/categories`);
    return response.data;
  },
};

export default api;

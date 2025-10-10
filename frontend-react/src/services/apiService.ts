// API service for communicating with backend
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Включаем отправку cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Токен теперь автоматически отправляется через HttpOnly cookies
    // Не нужно вручную добавлять в заголовки
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      // При 401/403 ошибке пользователь не аутентифицирован или токен истек
      // Cookies автоматически очистятся сервером
      console.log('🔒 JWT token expired or invalid - logging out user');
      
      // Очищаем состояние пользователя в localStorage
      localStorage.removeItem('user');
      
      // Уведомляем компоненты об истечении токена
      window.dispatchEvent(new CustomEvent('auth-expired'));
      
      // Не показываем ошибку для неавторизованных запросов
      // Это нормальное поведение при истечении токена
      if (error.config?.url?.includes('/auth/me') || error.config?.url?.includes('/users/profile')) {
        console.log('🔒 Silent auth check failed - user not authenticated');
        return Promise.reject(new Error('UNAUTHORIZED_SILENT'));
      }
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

  // Phone authentication
  async sendVerificationCode(phone: string) {
    const response = await api.post('/auth/send-verification-code', {
      phone
    });
    return response.data;
  },

  async verifyCode(phone: string, code: string, name?: string) {
    const response = await api.post('/auth/verify-code', {
      phone,
      code,
      name
    });
    return response.data;
  },

  async checkCode(phone: string, code: string) {
    const response = await api.post('/auth/check-code', {
      phone,
      code
    });
    return response.data;
  },

  async checkCodeStatus(phone: string) {
    const response = await api.get(`/auth/check-code-status?phone=${encodeURIComponent(phone)}`);
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

  // Avatar management
  async uploadAvatar(userId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteAvatar(userId: number) {
    const response = await api.delete(`/users/${userId}/avatar`);
    return response.data;
  },

  async updateProfile(userId: number, profileData: { name?: string; email?: string }) {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  },
};

export default api;

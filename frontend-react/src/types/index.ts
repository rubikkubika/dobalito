// Types for the application
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

export interface AppInfo {
  name: string;
  version: string;
  description: string;
  platforms: string[];
}

export interface HealthStatus {
  status: string;
  message: string;
  timestamp: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  englishName: string;
  description: string;
  icon: string | null;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Executor {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  rating?: number;
  description?: string;
  skills?: string[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string | null;
  creator: User;
  executor: User | null;
  category: Category;
}
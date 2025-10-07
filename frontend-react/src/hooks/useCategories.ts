import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Category } from '../types';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCategories = (activeOnly: boolean = true, language: string = 'ru'): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = activeOnly 
        ? await apiService.getActiveCategories(language)
        : await apiService.getCategories(language);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Ошибка загрузки категорий');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [activeOnly, language]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;

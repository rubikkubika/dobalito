// Language context for internationalization
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.profile': 'Профиль',
    'nav.settings': 'Настройки',
    'nav.designs': 'Дизайны',
    
    // Home page
    'home.welcome': 'Добро пожаловать в doBalito',
    'home.subtitle': 'Приложение для создания заданий с исполнителями',
    'home.categories': 'Категории',
    'home.features': 'Возможности приложения',
    
    // Categories
    'category.surfing': 'Серфинг',
    'category.bike_rental': 'Аренда байка',
    'category.tourism': 'Туризм',
    
    // Features
    'feature.create_tasks': 'Создание заданий',
    'feature.create_tasks_desc': 'Создавайте задания и находите исполнителей',
    'feature.find_executors': 'Поиск исполнителей',
    'feature.find_executors_desc': 'Находите подходящих исполнителей по рейтингу',
    'feature.profile_management': 'Управление профилем',
    'feature.profile_management_desc': 'Настраивайте свой профиль и портфолио',
    'feature.rating_system': 'Система рейтингов',
    'feature.rating_system_desc': 'Оценивайте качество работы исполнителей',
    'feature.secure_payments': 'Безопасные платежи',
    'feature.secure_payments_desc': 'Безопасная система оплаты заданий',
    'feature.mobile_apps': 'Мобильные приложения',
    'feature.mobile_apps_desc': 'Доступно на Android, iOS и Web',
    
    // Executors page
    'executors.title': 'Исполнители в категории',
    'executors.back': 'Назад',
    'executors.empty': 'Список исполнителей пуст',
    'executors.empty_desc': 'В данной категории пока нет исполнителей',
    
    // Language selector
    'lang.russian': 'Русский',
    'lang.english': 'English',
    'lang.indonesian': 'Bahasa Indonesia',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.designs': 'Designs',
    
    // Home page
    'home.welcome': 'Welcome to doBalito',
    'home.subtitle': 'Application for creating tasks with executors',
    'home.categories': 'Categories',
    'home.features': 'Application Features',
    
    // Categories
    'category.surfing': 'Surfing',
    'category.bike_rental': 'Bike Rental',
    'category.tourism': 'Tourism',
    
    // Features
    'feature.create_tasks': 'Task Creation',
    'feature.create_tasks_desc': 'Create tasks and find executors',
    'feature.find_executors': 'Find Executors',
    'feature.find_executors_desc': 'Find suitable executors by rating',
    'feature.profile_management': 'Profile Management',
    'feature.profile_management_desc': 'Customize your profile and portfolio',
    'feature.rating_system': 'Rating System',
    'feature.rating_system_desc': 'Rate the quality of executors\' work',
    'feature.secure_payments': 'Secure Payments',
    'feature.secure_payments_desc': 'Secure task payment system',
    'feature.mobile_apps': 'Mobile Apps',
    'feature.mobile_apps_desc': 'Available on Android, iOS and Web',
    
    // Executors page
    'executors.title': 'Executors in category',
    'executors.back': 'Back',
    'executors.empty': 'Executors list is empty',
    'executors.empty_desc': 'There are no executors in this category yet',
    
    // Language selector
    'lang.russian': 'Русский',
    'lang.english': 'English',
    'lang.indonesian': 'Bahasa Indonesia',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.profile': 'Profil',
    'nav.settings': 'Pengaturan',
    'nav.designs': 'Desain',
    
    // Home page
    'home.welcome': 'Selamat datang di doBalito',
    'home.subtitle': 'Aplikasi untuk membuat tugas dengan eksekutor',
    'home.categories': 'Kategori',
    'home.features': 'Fitur Aplikasi',
    
    // Categories
    'category.surfing': 'Selancar',
    'category.bike_rental': 'Sewa Sepeda',
    'category.tourism': 'Pariwisata',
    
    // Features
    'feature.create_tasks': 'Pembuatan Tugas',
    'feature.create_tasks_desc': 'Buat tugas dan temukan eksekutor',
    'feature.find_executors': 'Temukan Eksekutor',
    'feature.find_executors_desc': 'Temukan eksekutor yang sesuai berdasarkan rating',
    'feature.profile_management': 'Manajemen Profil',
    'feature.profile_management_desc': 'Sesuaikan profil dan portofolio Anda',
    'feature.rating_system': 'Sistem Rating',
    'feature.rating_system_desc': 'Nilai kualitas kerja eksekutor',
    'feature.secure_payments': 'Pembayaran Aman',
    'feature.secure_payments_desc': 'Sistem pembayaran tugas yang aman',
    'feature.mobile_apps': 'Aplikasi Mobile',
    'feature.mobile_apps_desc': 'Tersedia di Android, iOS dan Web',
    
    // Executors page
    'executors.title': 'Eksekutor dalam kategori',
    'executors.back': 'Kembali',
    'executors.empty': 'Daftar eksekutor kosong',
    'executors.empty_desc': 'Belum ada eksekutor dalam kategori ini',
    
    // Language selector
    'lang.russian': 'Русский',
    'lang.english': 'English',
    'lang.indonesian': 'Bahasa Indonesia',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

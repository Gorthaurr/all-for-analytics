'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Мок API для демонстрации
const mockApi = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Проверяем "правильные" данные
    if (email === 'demon3xv@mail.ru' && password === '123456') {
      return {
        id: '1',
        name: 'АНТОН ВЕСЕЛКОВ',
        email: 'demon3xv@mail.ru',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
    }
    
    // Другие тестовые пользователи
    if (email === 'test@test.com' && password === 'test') {
      return {
        id: '2',
        name: 'Тест Тестов',
        email: 'test@test.com',
        role: 'user',
        createdAt: new Date().toISOString()
      };
    }
    
    return null;
  },
  
  register: async (name: string, email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString()
    };
  },
  
  refreshUser: async (token: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Проверяем токен (в реальном приложении здесь будет API запрос)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    
    return null;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Проверяем сохраненную сессию при загрузке
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          const userData = await mockApi.refreshUser(token);
          if (userData) {
            setUser(userData);
          } else {
            // Токен недействителен, очищаем
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const userData = await mockApi.login(email, password);
      
      if (userData) {
        setUser(userData);
        const token = `token_${Date.now()}`; // Генерируем мок токен
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const userData = await mockApi.register(name, email, password);
      
      if (userData) {
        setUser(userData);
        const token = `token_${Date.now()}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Можно добавить редирект на главную страницу
    // window.location.href = '/';
    
    console.log('User logged out successfully');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const userData = await mockApi.refreshUser(token);
        if (userData) {
          setUser(userData);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      register,
      logout, 
      updateUser,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

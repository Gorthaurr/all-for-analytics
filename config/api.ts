export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    auth: {
      login: string;
      register: string;
      logout: string;
      refresh: string;
    };
    users: {
      profile: string;
      update: string;
      list: string;
    };
    analytics: {
      dashboard: string;
      reports: string;
      data: string;
    };
  };
}

const API_CONFIGS = {
  localhost: {
    baseUrl: 'http://localhost:8000/api',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: '/auth/refresh'
      },
      users: {
        profile: '/users/profile',
        update: '/users/update',
        list: '/users'
      },
      analytics: {
        dashboard: '/analytics/dashboard',
        reports: '/analytics/reports',
        data: '/analytics/data'
      }
    }
  },
  production: {
    baseUrl: 'https://your-vds-domain.com/api',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: '/auth/refresh'
      },
      users: {
        profile: '/users/profile',
        update: '/users/update',
        list: '/users'
      },
      analytics: {
        dashboard: '/analytics/dashboard',
        reports: '/analytics/reports',
        data: '/analytics/data'
      }
    }
  }
} as const;

// Тумблер для переключения окружения
let isProduction = false;

export const setEnvironment = (production: boolean) => {
  isProduction = production;
};

export const getApiConfig = (): ApiConfig => {
  return isProduction ? API_CONFIGS.production : API_CONFIGS.localhost;
};

// Удобные функции для API вызовов
export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const config = getApiConfig();
  const url = `${config.baseUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

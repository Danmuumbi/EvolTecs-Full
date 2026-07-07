export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'visitor' | 'customer' | 'admin';
  phone?: string;
  company?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string; // stored locally in workivo_users
  role?: 'client' | 'worker';
  avatarInitials?: string;
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

interface AuthContextType {
  currentUser: User | null;
  usersCount: number;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  signup: (params: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'client' | 'worker';
  }) => AuthResponse;
  login: (email: string, password: string) => AuthResponse;
  logout: () => void;
}

const STORAGE_USERS_KEY = 'workivo_users';
const STORAGE_CURRENT_USER_KEY = 'workivo_current_user';

// Seed demo users if localStorage is empty
const DEFAULT_DEMO_USERS: User[] = [
  {
    id: 'usr_demo_1',
    name: 'Ansh Gandhi',
    email: 'ansh@workivo.coop',
    phone: '+91 9426262139',
    password: 'password123',
    role: 'client',
    avatarInitials: 'AG',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr_demo_2',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@workivo.coop',
    phone: '+91 9876543210',
    password: 'password123',
    role: 'worker',
    avatarInitials: 'RK',
    createdAt: new Date().toISOString()
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Load existing users or seed defaults, and restore active session
  useEffect(() => {
    try {
      const storedUsersRaw = localStorage.getItem(STORAGE_USERS_KEY);
      let usersList: User[] = [];

      if (!storedUsersRaw) {
        usersList = DEFAULT_DEMO_USERS;
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
      } else {
        usersList = JSON.parse(storedUsersRaw);
      }
      setUsersCount(usersList.length);

      // Restore active user session
      const activeUserRaw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (activeUserRaw) {
        const parsed = JSON.parse(activeUserRaw);
        setCurrentUser(parsed);
      }
    } catch (e) {
      console.error('[WORKIVO Auth] Failed to initialize localStorage users', e);
    }
  }, []);

  const getStoredUsers = (): User[] => {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_DEMO_USERS;
    } catch {
      return DEFAULT_DEMO_USERS;
    }
  };

  const saveStoredUsers = (users: User[]) => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      setUsersCount(users.length);
    } catch (e) {
      console.error('[WORKIVO Auth] Failed to save users to localStorage', e);
    }
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.substring(0, 2) || 'WK').toUpperCase();
  };

  const signup = ({
    name,
    email,
    password,
    phone = '',
    role = 'client'
  }: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'client' | 'worker';
  }): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please enter a valid full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const currentUsers = getStoredUsers();
    const existing = currentUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        success: false,
        error: `An account with ${cleanEmail} already exists in local storage. Please sign in instead.`
      };
    }

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      password,
      role,
      avatarInitials: getInitials(cleanName),
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...currentUsers, newUser];
    saveStoredUsers(updatedUsers);

    // Save active session
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser as User);

    return { success: true, user: safeUser as User };
  };

  const login = (email: string, password: string): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return { success: false, error: 'Please enter both your email and password.' };
    }

    const currentUsers = getStoredUsers();
    const matchedUser = currentUsers.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        error: 'Invalid email or password. Verify credentials or click "Create Account".'
      };
    }

    // Save active session without leaking password in session object
    const { password: _, ...safeUser } = matchedUser;
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser as User);

    return { success: true, user: safeUser as User };
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersCount,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

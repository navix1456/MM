
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real application, this would connect to an API service
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation for demonstration
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation (in a real app, this would be a server call)
      if (email && password) {
        const mockUser = {
          id: 'user-' + Date.now(),
          name: email.split('@')[0],
          email
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success("Logged in successfully");
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // This is a mock implementation for demonstration
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation (in a real app, this would be a server call)
      if (name && email && password) {
        const mockUser = {
          id: 'user-' + Date.now(),
          name,
          email
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success("Account created successfully");
        return true;
      } else {
        toast.error("Please fill in all fields");
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

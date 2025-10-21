// context/AuthContext.tsx
import { getCurrentUser, loginUser, logoutUser } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUser = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const user = await getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.name || storedUsername || null);
        await AsyncStorage.setItem("username", user.name || "");
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    const user = await getCurrentUser();
    setIsLoggedIn(true);
    setUsername(user?.name || email);
    await AsyncStorage.setItem("username", user?.name || email);
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUsername(null);
    await AsyncStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

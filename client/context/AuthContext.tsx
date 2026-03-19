import React, { createContext, useState, useEffect } from "react";
import { User, USERS, generateDefaultDashboardData } from "@/data/users";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  signUp: (userData: Omit<User, "id">) => { success: boolean; error?: string };
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Initialize users from localStorage or use default USERS
  useEffect(() => {
    let usersToSet = [...USERS];

    const savedUsers = localStorage.getItem("allUsers");
    if (savedUsers) {
      try {
        usersToSet = JSON.parse(savedUsers);
      } catch {
        usersToSet = [...USERS];
      }
    }

    setAllUsers(usersToSet);

    // Restore logged-in user
    const savedUserId = localStorage.getItem("loggedInUserId");
    if (savedUserId) {
      const foundUser = usersToSet.find((u: User) => u.id === savedUserId);
      if (foundUser) {
        setUser(foundUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // First try to find user in current state
    let foundUser = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    // If not found in state, check localStorage directly (in case state hasn't updated yet)
    if (!foundUser) {
      const savedUsers = localStorage.getItem("allUsers");
      if (savedUsers) {
        try {
          const usersFromStorage = JSON.parse(savedUsers);
          foundUser = usersFromStorage.find(
            (u: User) => u.username === username && u.password === password
          );
        } catch {
          // If parsing fails, continue with allUsers only
        }
      }
    }

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      localStorage.setItem("loggedInUserId", foundUser.id);
      return true;
    }
    return false;
  };

  const signUp = (userData: Omit<User, "id">): { success: boolean; error?: string } => {
    // Check if username already exists
    if (allUsers.some((u) => u.username === userData.username)) {
      return { success: false, error: "Username already exists" };
    }

    // Create new user with unique ID
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    // Add to users list
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    // Generate default dashboard data for new user
    const defaultDashboardData = generateDefaultDashboardData(newUser.id);
    const savedDashboardData = localStorage.getItem("userDashboardData");
    const allDashboardData = savedDashboardData ? JSON.parse(savedDashboardData) : {};
    allDashboardData[newUser.id] = defaultDashboardData;
    localStorage.setItem("userDashboardData", JSON.stringify(allDashboardData));

    // Automatically log in the new user
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInUserId", newUser.id);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUserId");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

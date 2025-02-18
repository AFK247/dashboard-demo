"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface AppContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create context with undefined as default and explicit typing
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, [localToken]);

  const value: AppContextProps = { token, setToken };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

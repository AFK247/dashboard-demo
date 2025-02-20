"use client";
import { ChartData, SummaryData } from "@/types/dashboard.types";
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
  summaryData: SummaryData | null;
  setSummaryData: React.Dispatch<React.SetStateAction<SummaryData | null>>;
  stats: ChartData | null;
  setStats: React.Dispatch<React.SetStateAction<ChartData | null>>;
}

// Create context with undefined as default and explicit typing
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [stats, setStats] = useState<ChartData | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const value: AppContextProps = {
    token,
    setToken,
    summaryData,
    setSummaryData,
    stats,
    setStats,
  };

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

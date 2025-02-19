import { SummaryData } from "@/types";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import ArrowDown from "@/assets/svgs/arrow-down.svg";

const calculateChange = (current: number, previous: number) => {
  return Math.abs(((current - previous) / previous) * 100).toFixed(1);
};

export const normalizedSummaryData = (summaryData: SummaryData | null) => {
  if (!summaryData?.current || !summaryData?.previous) {
    return [];
  }

  const current = summaryData.current;
  const previous = summaryData.previous;

  return [
    {
      title: "Total active users",
      value: (current.active_users / 1000).toFixed(1),
      icon: current.active_users >= previous.active_users ? ArrowUp : ArrowDown,
      change: calculateChange(current.active_users, previous.active_users),
    },
    {
      title: "Total clicks",
      value: (current.clicks / 1000).toFixed(1),
      icon: current.clicks >= previous.clicks ? ArrowUp : ArrowDown,
      change: calculateChange(current.clicks, previous.clicks),
    },
    {
      title: "Total appearances",
      value: (current.appearance / 1000).toFixed(1),
      icon: current.appearance >= previous.appearance ? ArrowUp : ArrowDown,
      change: calculateChange(current.appearance, previous.appearance),
    },
  ];
};

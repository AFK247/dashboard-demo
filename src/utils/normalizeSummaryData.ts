import { SummaryData } from "@/types";

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
      upgraded: current.active_users >= previous.active_users,
      change: calculateChange(current.active_users, previous.active_users),
    },
    {
      title: "Total clicks",
      value: (current.clicks / 1000).toFixed(1),
      upgraded: current.clicks >= previous.clicks,
      change: calculateChange(current.clicks, previous.clicks),
    },
    {
      title: "Total appearances",
      value: (current.appearance / 1000).toFixed(1),
      upgraded: current.appearance >= previous.appearance,
      change: calculateChange(current.appearance, previous.appearance),
    },
  ];
};

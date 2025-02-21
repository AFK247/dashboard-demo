import { ChartData } from "@/types/dashboard.types";
import { SummaryData } from "@/types/dashboard.types";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import ArrowDown from "@/assets/svgs/arrow-down.svg";

export const filterOptions = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "this-week", label: "This Week" },
  { value: "last-week", label: "Last Week" },
];

export const normalizeChartData = (data: ChartData | null) => {
  if (!data) {
    return {
      barChartCategory: [],
      barChartSeries: [],
      lineChartCategory: [],
      lineChartSeries: [],
    };
  }
  const categories = Object.keys(data?.website_visits);
  const desktopData = categories?.map(
    (day) => data?.website_visits[day]?.desktop
  );
  const mobileData = categories.map((day) => data?.website_visits[day]?.mobile);

  const barChartSeries = [
    { name: "Desktop", data: desktopData },
    { name: "Mobile", data: mobileData },
  ];

  const barChartCategory = categories.map(
    (day) => day.slice(0, 3).charAt(0).toUpperCase() + day.slice(1, 3)
  );

  const lineChartCategory = Object.keys(data?.offers_sent).map(
    (day) => day.slice(0, 3).charAt(0).toUpperCase() + day.slice(1, 3)
  );

  const lineChartSeries = [
    {
      name: "Offers Sent",
      data: Object.keys(data?.offers_sent)?.map(
        (val) => data?.offers_sent[val]
      ),
    },
  ];

  return {
    barChartCategory,
    barChartSeries,
    lineChartCategory,
    lineChartSeries,
  };
};

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

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Grid2,
} from "@mui/material";
import BarChart from "@/components/dashboard/charts/BarChart";
import LineChart from "@/components/dashboard/charts/LineChart";
import OfferList from "@/components/dashboard/OfferList";
import { useAppContext } from "@/lib/providers/AppContext";
import {
  getDashboardStats,
  getDashboardSummary,
} from "@/api/dashboard/dashboardApi";
import { NormalizedSummaryData } from "@/types/dashboard-types";
import SummaryCard from "@/components/dashboard/SummaryCard";
import {
  filterOptions,
  normalizeChartData,
  normalizedSummaryData,
} from "@/utils/dashboard-utils";

const Dashboard = () => {
  const { summaryData, setSummaryData, stats, setStats } = useAppContext();

  const [query, setQuery] = useState<Record<string, any>>({
    filter: "this-month",
  });

  const fetchDashboardData = async () => {
    if (!summaryData) {
      const dashboardSummary = await getDashboardSummary(query);
      setSummaryData(dashboardSummary);
    }

    if (!stats) {
      const dashboardStats = await getDashboardStats(query);
      setStats(dashboardStats);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [query]);

  const normalizedSummary: NormalizedSummaryData[] =
    normalizedSummaryData(summaryData);

  const changeFilter = (event: SelectChangeEvent) => {
    const newFilter = event.target.value as string;
    setQuery({ filter: newFilter });
  };

  const {
    barChartCategory,
    barChartSeries,
    lineChartCategory,
    lineChartSeries,
  } = normalizeChartData(stats);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Dashboard</Typography>

        <Select size="small" defaultValue="this-month" onChange={changeFilter}>
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {normalizedSummary?.map((summary, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4 }}>
            <SummaryCard summary={summary} />
          </Grid2>
        ))}
      </Grid2>

      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ mt: 5 }}
      >
        <Grid2 size={{ xs: 4, sm: 8, md: 6 }}>
          <BarChart
            barChartCategory={barChartCategory}
            barChartSeries={barChartSeries}
          />
        </Grid2>
        <Grid2 size={{ xs: 4, sm: 8, md: 6 }}>
          <LineChart
            lineChartCategory={lineChartCategory}
            lineChartSeries={lineChartSeries}
          />
        </Grid2>
      </Grid2>

      <OfferList />
    </Box>
  );
};

export default Dashboard;

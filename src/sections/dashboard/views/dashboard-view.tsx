"use client";
import React, { useEffect, useState } from "react"; // Import useState
import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import StatCard from "@/components/dashboard/StatCard";
import BarChart from "@/components/dashboard/charts/BarChart";
import LineChart from "@/components/dashboard/charts/LineChart";
import OfferList from "@/components/dashboard/OfferList";
import { Stat } from "@/types";
import { useAppContext } from "@/lib/providers/AppContext";
import {
  getDashboardStats,
  getDashboardSummary,
} from "@/api/dashboard/dashboardApi";
import { normalizeChartData } from "@/utils/normalizeChartData";

const Dashboard = () => {
  const { summaryData, setSummaryData, stats, setStats } = useAppContext();

  const [query, setQuery] = useState<Record<string, any>>({
    filter: "this-month",
  });

  const apiCalls = async () => {
    const dashboardSummary = await getDashboardSummary(query);
    setSummaryData(dashboardSummary);

    const dashboardStats = await getDashboardStats(query);
    setStats(dashboardStats);
  };

  useEffect(() => {
    apiCalls();
  }, [query]);

  let normalizedStats: Stat[] = [];

  if (summaryData && summaryData.current && summaryData.previous) {
    normalizedStats = [
      {
        title: "Total active users",
        value: `${(summaryData.current.active_users / 1000).toFixed(1)}k`,
        change: `${
          summaryData.current.active_users >= summaryData.previous.active_users
            ? "▲"
            : "▼"
        }${Math.abs(
          ((summaryData.current.active_users -
            summaryData.previous.active_users) /
            summaryData.previous.active_users) *
            100
        ).toFixed(1)}%`,
      },
      {
        title: "Total clicks",
        value: `${(summaryData.current.clicks / 1000).toFixed(1)}k`,
        change: `${
          summaryData.current.clicks >= summaryData.previous.clicks ? "▲" : "▼"
        }${Math.abs(
          ((summaryData.current.clicks - summaryData.previous.clicks) /
            summaryData.previous.clicks) *
            100
        ).toFixed(1)}%`,
      },
      {
        title: "Total appearances",
        value: `${(summaryData.current.appearance / 1000).toFixed(1)}k`,
        change: `${
          summaryData.current.appearance >= summaryData.previous.appearance
            ? "▲"
            : "▼"
        }${Math.abs(
          ((summaryData.current.appearance - summaryData.previous.appearance) /
            summaryData.previous.appearance) *
            100
        ).toFixed(1)}%`,
      },
    ];
  }

  const changeFilter = (event: SelectChangeEvent) => {
    const newFilter = event.target.value as string;
    setQuery({ filter: newFilter });
  };

  let barChartCategory: string[] = [];
  let barChartSeries: { name: string; data: number[] }[] = [];
  let lineChartCategory: string[] = [];
  let lineChartSeries: { name: string; data: number[] }[] = [];

  if (stats) {
    barChartCategory = normalizeChartData(stats).barChartCategory;
    barChartSeries = normalizeChartData(stats).barChartSeries;
    lineChartCategory = normalizeChartData(stats).lineChartCategory;
    lineChartSeries = normalizeChartData(stats).lineChartSeries;
  }

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
        <Typography variant="h5" component="h2" fontWeight="600">
          Dashboard
        </Typography>
        <Select size="small" defaultValue="this-month" onChange={changeFilter}>
          <MenuItem value="this-month">This Month</MenuItem>
          <MenuItem value="last-month">Last Month</MenuItem>
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="last-week">Last Week</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={3}>
        {normalizedStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <BarChart
            barChartCategory={barChartCategory}
            barChartSeries={barChartSeries}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            lineChartCategory={lineChartCategory}
            lineChartSeries={lineChartSeries}
          />
        </Grid>
      </Grid>

      <OfferList />
    </Box>
  );
};

export default Dashboard;

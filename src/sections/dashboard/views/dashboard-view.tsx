"use client";
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
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

const Dashboard = () => {
  // const statss: Stat[] = [
  //   {
  //     title: "Total active users",
  //     value: "8.2k",
  //     change: "▲8.2%",
  //   },
  //   { title: "Total clicks", value: "8.2k", change: "▲8.2%" },
  //   {
  //     title: "Total appearances",
  //     value: "8.2k",
  //     change: "▼8.2%",
  //   },
  // ];

  const { summaryData, setSummaryData, stats, setStats } = useAppContext();

  const apiCalls = async () => {
    const dashboardSummary = await getDashboardSummary();
    setSummaryData(dashboardSummary);

    const dashboardStats = await getDashboardStats();
    setStats(dashboardStats);
  };

  useEffect(() => {
    apiCalls();
  }, []);

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

  console.log(normalizedStats);

  return (
    <Box>
      <DashboardHeader />
      <Grid container spacing={3}>
        {normalizedStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <BarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart />
        </Grid>
      </Grid>

      <OfferList />
    </Box>
  );
};

export default Dashboard;

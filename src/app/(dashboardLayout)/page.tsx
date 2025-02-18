"use client";
import React from "react";
import { Box, Grid } from "@mui/material";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Stat } from "@/types/dashboard.type";
import StatCard from "@/components/dashboard/StatCard";
import OfferList from "@/components/dashboard/OfferList";
import BarChart from "@/components/dashboard/charts/BarChart";
import LineChart from "@/components/dashboard/charts/LineChart";

const DashboardPage = () => {
  const stats: Stat[] = [
    {
      title: "Total active users",
      value: "8.2k",
      change: "▲8.2% previous month",
    },
    { title: "Total clicks", value: "8.2k", change: "▲8.2% previous month" },
    {
      title: "Total appearances",
      value: "8.2k",
      change: "▼8.2% previous month",
    },
  ];

  return (
    <Box>
      <DashboardHeader />
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
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

export default DashboardPage;

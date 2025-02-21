"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useAppContext } from "@/lib/providers/AppContext";
import { ChartSeries } from "@/types/dashboard-types";
import { Box, Typography } from "@mui/material";
import { StyledCard } from "@/components/ui/StyledCard";

type BarChartProps = {
  barChartCategory: string[];
  barChartSeries: ChartSeries[];
};

// Component implementation without SSR
const BarChartComponent: React.FC<BarChartProps> = ({
  barChartCategory,
  barChartSeries,
}) => {
  const chartRef = useRef(null);
  const { stats } = useAppContext();
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const initChart = async () => {
      const ApexCharts = (await import("apexcharts")).default;

      const options = {
        chart: {
          type: "bar",
          height: 340,
          toolbar: { show: false },
        },
        xaxis: {
          categories: barChartCategory,
          labels: { style: { colors: "#9aa0a6" } },
        },
        yaxis: {
          labels: { style: { colors: "#9aa0a6" } },
        },
        colors: ["#007867", "#FFAB00"],
        grid: { borderColor: "#e0e0e0" },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: { colors: "#9aa0a6" },
        },
        series: barChartSeries,
      };

      if (chartRef.current) {
        // Clean up existing chart if any
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create and render new chart
        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      }
    };

    initChart();

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats, barChartCategory, barChartSeries]);

  return (
    <StyledCard sx={{ p: 1 }}>
      <Typography variant="h6" fontWeight="600" m={2}>
        Website Visits
      </Typography>
      <Box ref={chartRef} />
    </StyledCard>
  );
};

// Export with dynamic import and disabled SSR
const BarChart = dynamic(() => Promise.resolve(BarChartComponent), {
  ssr: false,
});
export default BarChart;

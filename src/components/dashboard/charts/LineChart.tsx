"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChartSeries } from "@/types/dashboard-types";
import { Box, Typography } from "@mui/material";
import { StyledCard } from "@/components/ui/StyledCard";

type LineChartProps = {
  lineChartCategory: string[];
  lineChartSeries: ChartSeries[];
};

// Component implementation without SSR
const LineChartComponent: React.FC<LineChartProps> = ({
  lineChartCategory,
  lineChartSeries,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const initChart = async () => {
      const ApexCharts = (await import("apexcharts")).default;

      const options = {
        chart: {
          type: "line",
          height: 340,
          toolbar: { show: false },
        },
        xaxis: {
          categories: lineChartCategory,
          labels: { style: { colors: "#9aa0a6" } },
        },
        yaxis: {
          labels: { style: { colors: "#9aa0a6" } },
        },
        colors: ["#000"],
        stroke: {
          curve: "smooth",
        },
        grid: { borderColor: "#e0e0e0" },
        series: lineChartSeries,
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
  }, [lineChartSeries, lineChartCategory]);

  return (
    <StyledCard sx={{ p: 1 }}>
      <Typography variant="h6" fontWeight="600" m={2}>
        Offers Sent
      </Typography>
      <Box ref={chartRef} />
    </StyledCard>
  );
};

// Export with dynamic import and disabled SSR
const LineChart = dynamic(() => Promise.resolve(LineChartComponent), {
  ssr: false,
});
export default LineChart;

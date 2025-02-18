"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Component implementation without SSR
const LineChartComponent = ({
  lineChartCategory,
  lineChartSeries,
}: {
  lineChartCategory: string[];
  lineChartSeries: { name: string; data: number[] }[];
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const initChart = async () => {
      const ApexCharts = (await import("apexcharts")).default;

      const options = {
        chart: {
          type: "line",
          height: 250,
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
        // series: [{ name: "Offers Sent", data: [15, 20, 65, 68, 85, 68, 50] }],
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

  return <div ref={chartRef} />;
};

// Export with dynamic import and disabled SSR
const LineChart = dynamic(() => Promise.resolve(LineChartComponent), {
  ssr: false,
});
export default LineChart;

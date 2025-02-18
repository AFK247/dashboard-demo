"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useAppContext } from "@/lib/providers/AppContext";

const BarChartComponent = ({
  barChartCategory,
  barChartSeries,
}: {
  barChartCategory: string[];
  barChartSeries: { name: string; data: number[] }[];
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
          height: 250,
          toolbar: { show: false },
        },
        xaxis: {
          categories: barChartCategory,
          labels: { style: { colors: "#9aa0a6" } },
        },
        yaxis: {
          labels: { style: { colors: "#9aa0a6" } },
        },
        colors: ["#3db998", "#ffc221"],
        grid: { borderColor: "#e0e0e0" },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
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

  return <div ref={chartRef} />;
};

// Export with dynamic import and disabled SSR
const BarChart = dynamic(() => Promise.resolve(BarChartComponent), {
  ssr: false,
});
export default BarChart;

import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const LineChart = () => {
  const lineChartRef = useRef(null);

  useEffect(() => {
    const lineChartOptions = {
      chart: {
        type: "line",
        height: 250,
        toolbar: { show: false }, // Hide toolbar
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: { style: { colors: "#9aa0a6" } },
      },
      yaxis: { labels: { style: { colors: "#9aa0a6" } } },
      colors: ["#000"],
      stroke: {
        curve: "smooth",
      },
      grid: { borderColor: "#e0e0e0" },
      series: [{ name: "Offers Sent", data: [15, 20, 65, 68, 85, 68, 50] }],
    };

    if (lineChartRef.current) {
      new ApexCharts(lineChartRef.current, lineChartOptions).render();
    }
  }, []);

  return <div ref={lineChartRef}></div>;
};

export default LineChart;

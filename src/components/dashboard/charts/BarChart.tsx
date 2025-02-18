import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const BarChart = () => {
  const barChartRef = useRef(null);

  useEffect(() => {
    const barChartOptions = {
      chart: {
        type: "bar",
        height: 250,
        toolbar: { show: false }, // Hide toolbar
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: { style: { colors: "#9aa0a6" } },
      },
      yaxis: { labels: { style: { colors: "#9aa0a6" } } },
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
      series: [
        { name: "Desktop", data: [40, 60, 30, 45, 50, 47, 85] },
        { name: "Mobile", data: [30, 45, 40, 35, 20, 10, 15] },
      ],
    };

    if (barChartRef.current) {
      new ApexCharts(barChartRef.current, barChartOptions).render();
    }
  }, []);

  return <div ref={barChartRef}></div>;
};

export default BarChart;

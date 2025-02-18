export const normalizeChartData = (data: any) => {
  const categories = Object.keys(data?.website_visits);
  const desktopData = categories?.map(
    (day) => data?.website_visits[day]?.desktop
  );
  const mobileData = categories.map((day) => data?.website_visits[day]?.mobile);

  const barChartSeries = [
    { name: "Desktop", data: desktopData },
    { name: "Mobile", data: mobileData },
  ];

  const barChartCategory = categories.map(
    (day) => day.slice(0, 3).charAt(0).toUpperCase() + day.slice(1, 3)
  );

  const lineChartCategory = Object.keys(data?.offers_sent).map(
    (day) => day.slice(0, 3).charAt(0).toUpperCase() + day.slice(1, 3)
  );

  const lineChartSeries = [
    {
      name: "Offers Sent",
      data: Object.keys(data?.offers_sent)?.map(
        (val) => data?.offers_sent[val]
      ),
    },
  ];

  return {
    barChartCategory,
    barChartSeries,
    lineChartCategory,
    lineChartSeries,
  };
};

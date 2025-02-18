import React from "react";
import { Typography, Select, MenuItem, Box } from "@mui/material";

const DashboardHeader = () => {
  return (
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
      <Select size="small" defaultValue="This Month">
        <MenuItem value="This Month">This Month</MenuItem>
        <MenuItem value="Last Month">Last Month</MenuItem>
      </Select>
    </Box>
  );
};

export default DashboardHeader;

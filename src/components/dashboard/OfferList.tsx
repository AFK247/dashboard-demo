import React from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Paper,
  Tabs,
  Tab,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import SearchInput from "@/components/dashboard/SearchInput";
import { Row } from "@/types/dashboard.type";

interface OfferListProps {}

const OfferList: React.FC<OfferListProps> = () => {
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone number", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "job", headerName: "Job Title", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={
            params.value === "Accepted"
              ? "success"
              : params.value === "Rejected"
              ? "error"
              : "warning"
          }
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="edit" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="more" size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows: Row[] = [
    {
      id: 1,
      name: "Jayvion Simon",
      phone: "365-374-4961",
      company: "Lueilwitz and Sons",
      job: "CEO",
      type: "Monthly",
      status: "Accepted",
    },
    {
      id: 2,
      name: "Jayvion Simon",
      phone: "365-374-4961",
      company: "Lueilwitz and Sons",
      job: "CEO",
      type: "Yearly",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Jayvion Simon",
      phone: "365-374-4961",
      company: "Lueilwitz and Sons",
      job: "CEO",
      type: "Monthly",
      status: "Pending",
    },
    {
      id: 4,
      name: "Jayvion Simon",
      phone: "365-374-4961",
      company: "Lueilwitz and Sons",
      job: "CEO",
      type: "Pay As You Go",
      status: "Accepted",
    },
    {
      id: 5,
      name: "Jayvion Simon",
      phone: "365-374-4961",
      company: "Lueilwitz and Sons",
      job: "CEO",
      type: "Monthly",
      status: "Accepted",
    },
  ];
  return (
    <Box mt={4}>
      <Typography variant="h6" component="h3" fontWeight="600" mb={2}>
        Offer List
      </Typography>
      <Tabs value={0}>
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <SearchInput />
        <Select size="small" defaultValue="All">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
              borderBottom: "1px solid #e0e0e0",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default OfferList;

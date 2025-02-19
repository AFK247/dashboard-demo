import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Paper,
  Tabs,
  Tab,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Row } from "@/types";
import { StyledCard } from "../ui/StyledCard";
import { StyledSelect, StyledTextField } from "@/styles";

interface OfferListProps {}

const OfferList: React.FC<OfferListProps> = () => {
  // State for search, filter, and tabs
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [filteredRows, setFilteredRows] = useState<Row[]>([]);

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

  // Filter function to handle all filtering logic
  const filterRows = (rows: Row[]) => {
    return rows.filter((row) => {
      // Filter by tab (All or Accepted)
      if (tabValue === 1 && row.status !== "Accepted") return false;

      // Filter by search query
      const searchFields = [
        row.name,
        row.phone,
        row.company,
        row.job,
        row.type,
        row.status,
      ].map((field) => field.toLowerCase());

      const searchMatches =
        searchQuery === "" ||
        searchFields.some((field) => field.includes(searchQuery.toLowerCase()));

      // Filter by type
      const typeMatches =
        filterType === "all" ||
        row.type.toLowerCase() === filterType.toLowerCase();

      return searchMatches && typeMatches;
    });
  };

  // Update filtered rows whenever search, filter, or tab changes
  useEffect(() => {
    const filtered = filterRows(rows);
    setFilteredRows(filtered);
  }, [searchQuery, filterType, tabValue]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledCard sx={{ p: 1, mt: 4 }}>
      <Typography variant="h6" fontWeight="600" m={2}>
        Offer List
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ ml: 1.5 }}>
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ width: "40%" }}>
          <StyledTextField
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <StyledSelect
          value={filterType}
          onChange={(e: SelectChangeEvent<unknown>) =>
            setFilterType(e.target.value as string)
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
          <MenuItem value="Pay As You Go">Pay As You Go</MenuItem>
        </StyledSelect>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            border: "none",
          }}
        />
      </Paper>
    </StyledCard>
  );
};

export default OfferList;

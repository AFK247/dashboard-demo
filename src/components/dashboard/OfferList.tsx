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
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { OfferData, Row } from "@/types/dashboard.types";
import { StyledCard } from "../ui/StyledCard";
import { StyledSelect, StyledTextField } from "@/styles";
import { useAppContext } from "@/lib/providers/AppContext";
import { getOfferList } from "@/api/offers/offerApi";

interface PaginationData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  data: Row[];
}

interface CachedData {
  [key: string]: Row[]; // key will be "page_pageSize"
}

const OfferList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 5,
    to: 5,
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState<CachedData>({});

  const { summaryData, setSummaryData, stats, setStats } = useAppContext();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const getCacheKey = (page: number, pageSize: number) => `${page}_${pageSize}`;

  const fetchTableData = async () => {
    const cacheKey = getCacheKey(
      paginationModel.page,
      paginationModel.pageSize
    );

    // Check if data is already in cache
    if (cachedData[cacheKey]) {
      setFilteredData(cachedData[cacheKey]);
      return;
    }

    setLoading(true);
    const response = await getOfferList({
      page: paginationModel.page + 1,
      per_page: paginationModel.pageSize,
    });

    if (response) {
      setPaginationData(response?.meta);
      setFilteredData(response.data);

      // Cache the new data
      setCachedData((prev) => ({
        ...prev,
        [cacheKey]: response.data,
      }));
    }
  };

  // Filter function to handle local filtering
  const filterRows = (rows: Row[]) => {
    return rows.filter((row) => {
      // Filter by tab (All or Accepted)
      if (tabValue === 1 && row.status !== "accepted") return false;

      // Filter by search query
      const searchFields = [
        row.user_name,
        row.email,
        row.phone,
        row.company,
        row.jobTitle,
        row.type,
        row.status,
      ].map((field) => field?.toLowerCase() || "");

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

  // Apply filters whenever search, filter type, or tab changes
  useEffect(() => {
    const filtered = filterRows(filteredData);
    setFilteredData(filtered);
  }, [searchQuery, filterType, tabValue]);

  // Fetch data when pagination changes
  useEffect(() => {
    fetchTableData();
  }, [paginationModel]);

  // Clear cache when filter type or tab changes
  useEffect(() => {
    setCachedData({});
  }, [filterType, tabValue]);

  const columns = [
    {
      field: "user_name",
      headerName: "Name",
      flex: 1,
      renderCell: (params: any) => (
        <Box display="flex" flexDirection="column">
          <Typography variant="body2">{params.row.user_name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    { field: "phone", headerName: "Phone number", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={
            params.value === "accepted"
              ? "success"
              : params.value === "rejected"
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    setPaginationModel(newPaginationModel);
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
          onChange={(e: SelectChangeEvent<unknown>) => {
            setFilterType(e.target.value as string);
            setPaginationModel({ ...paginationModel, page: 0 });
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
          <MenuItem value="Pay As You Go">Pay As You Go</MenuItem>
        </StyledSelect>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pagination
          paginationMode="server"
          rowCount={paginationData.total}
          loading={loading}
          disableRowSelectionOnClick
          getRowId={(row) => row.id || Math.random()}
        />
      </Paper>
    </StyledCard>
  );
};

export default OfferList;

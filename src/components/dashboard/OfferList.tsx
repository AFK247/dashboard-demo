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
import {
  TCachedTableData,
  TOfferList,
  TPaginationData,
} from "@/types/dashboard.types";
import { StyledCard } from "../ui/StyledCard";
import { StyledSelect, StyledTextField } from "@/styles";
import { getOfferList } from "@/api/offers/offerApi";
import { capitalizeFirstLetter } from "@/utils/dashboard-utils";

const OfferList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [paginationData, setPaginationData] = useState<TPaginationData>({
    last_page: 1,
    per_page: 5,
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState<TCachedTableData>({});
  const [originalData, setOriginalData] = useState<TOfferList[]>([]);
  const [filteredData, setFilteredData] = useState<TOfferList[]>([]);

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
      setOriginalData(cachedData[cacheKey]);
      return;
    }

    setLoading(true);
    try {
      const response = await getOfferList({
        page: paginationModel.page + 1,
        per_page: paginationModel.pageSize,
      });

      if (response) {
        setPaginationData(response?.meta);
        setOriginalData(response.data);

        // Cache the new data
        setCachedData((prev) => ({
          ...prev,
          [cacheKey]: response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Filter function to handle local filtering
  const filterRows = (rows: TOfferList[]) => {
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

  // Apply filters whenever search, filter type, tab, or original data changes
  useEffect(() => {
    const filtered = filterRows(originalData);
    setFilteredData(filtered);
  }, [searchQuery, filterType, tabValue, originalData]);

  // Fetch data when pagination changes
  useEffect(() => {
    fetchTableData();
  }, [paginationModel]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    setPaginationModel(newPaginationModel);
  };

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
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params: any) => capitalizeFirstLetter(params.value),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <Chip
          label={capitalizeFirstLetter(params.value)}
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

  const filterList = [
    { value: "all", label: "All" },
    { value: "pay_as_you_go", label: "Pay As You Go" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

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
          {filterList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataGrid
          rowHeight={60}
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
          sx={{
            height: 430,
          }}
        />
      </Paper>
    </StyledCard>
  );
};

export default OfferList;

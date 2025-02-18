"use client";
import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  styled,
  InputBase,
  alpha,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation"; // Import useRouter

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const stats = [
    {
      title: "Total active users",
      value: "8.2k",
      change: "▲8.2% previous month",
    },
    { title: "Total clicks", value: "8.2k", change: "▲8.2% previous month" },
    {
      title: "Total appearances",
      value: "8.2k",
      change: "▼8.2% previous month",
    },
  ];

  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

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

    if (barChartRef.current) {
      new ApexCharts(barChartRef.current, barChartOptions).render();
    }
    if (lineChartRef.current) {
      new ApexCharts(lineChartRef.current, lineChartOptions).render();
    }
  }, []);

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

  const rows = [
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

  const drawerWidth = 240;

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "1px solid #ccc", // Add border
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    boxShadow: "0px 3px 5px rgba(0,0,0,0.05)",
  }));

  // Function to handle navigation
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Dashboard
          </Typography>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <List>
            <ListItem onClick={() => navigateTo("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#777" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => navigateTo("/onboarding")}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#777" }} />
              </ListItemIcon>
              <ListItemText primary="Onboarding" />
            </ListItem>
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
          }}
          open
        >
          <List>
            <ListItem onClick={() => navigateTo("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#777" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => navigateTo("/onboarding")}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#777" }} />
              </ListItemIcon>
              <ListItemText primary="Onboarding" />
            </ListItem>
          </List>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
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

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="600" mt={0.5}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {stat.change}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  mb={1}
                  sx={{ color: "#333" }}
                >
                  Website visits
                </Typography>
                <div ref={barChartRef}></div>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  mb={1}
                  sx={{ color: "#333" }}
                >
                  Offers sent
                </Typography>
                <div ref={lineChartRef}></div>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
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
      </Box>
    </Box>
  );
};

export default Dashboard;

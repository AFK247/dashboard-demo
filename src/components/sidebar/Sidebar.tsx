import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
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
            width: 240,
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
            width: 240,
            borderRight: "none",
          },
        }}
        open
      >
        <List>
          <ListItem onClick={() => navigateTo("/")}>
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
  );
};

export default Sidebar;

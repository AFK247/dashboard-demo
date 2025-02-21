"use client";
import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "@/components/sidebar/Sidebar";
import Profile from "@/assets/svgs/profile.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearToken } from "@/services/auth-service";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
          bgcolor: "#fff",
          color: "#000",
          boxShadow: "0px 2px 4px rgba(97, 97, 97, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: {
              sm: "flex-end",
              xs: "space-between",
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            onClick={handleLogout}
            size="small"
            color="error"
            variant="outlined"
          >
            Logout
          </Button>
          <IconButton>
            <Image src={Profile} alt="profile" height={40} width={40} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 280px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

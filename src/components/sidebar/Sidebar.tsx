import React from "react";
import { Drawer, ListItemText, Box, Typography, List } from "@mui/material";
import Image from "next/image";
import CompanyLogo from "@/assets/svgs/company.svg";
import DashboardIcon from "@/assets/svgs/dashboard.svg";
import OnboardIcon from "@/assets/svgs/onboard.svg";
import { usePathname } from "next/navigation";
import { StyledImage, StyledLink, StyledListItem } from "@/styles";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContent: React.FC<{ pathname: string }> = ({ pathname }) => (
  <>
    <Box sx={{ p: 3 }}>
      <Image
        src={CompanyLogo}
        alt="logo"
        style={{ width: "40px", height: "auto" }}
      />
    </Box>

    <Typography
      sx={{
        fontSize: "12px",
        color: "#94a3b8",
        fontWeight: 500,
        px: 3,
        pb: 1,
        letterSpacing: "0.5px",
      }}
    >
      OVERVIEW
    </Typography>

    <List sx={{ pt: 0 }}>
      <StyledListItem
        sx={{ bgcolor: pathname === "/" ? "#f2f6fc" : "" }}
        disablePadding
      >
        <StyledLink href="/">
          <StyledImage
            src={DashboardIcon}
            alt="dashboard"
            width={20}
            height={20}
          />
          <ListItemText
            primary="Dashboard"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                color: "#64748b",
                fontWeight: 500,
              },
            }}
          />
        </StyledLink>
      </StyledListItem>

      <StyledListItem
        sx={{ bgcolor: pathname === "/onboarding" ? "#f2f6fc" : "" }}
        disablePadding
      >
        <StyledLink href="/onboarding">
          <StyledImage
            src={OnboardIcon}
            alt="onboarding"
            width={20}
            height={20}
          />
          <ListItemText
            primary="Onboarding"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                color: "#64748b",
                fontWeight: 500,
              },
            }}
          />
        </StyledLink>
      </StyledListItem>
    </List>
  </>
);

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const pathname = usePathname();
  return (
    <Box
      component="nav"
      sx={{ width: { sm: 280 }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: "#ffffff",
          },
        }}
      >
        <DrawerContent pathname={pathname} />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            borderRight: "none",
            backgroundColor: "#ffffff",
          },
        }}
        open
      >
        <DrawerContent pathname={pathname} />
      </Drawer>
    </Box>
  );
};

export default Sidebar;

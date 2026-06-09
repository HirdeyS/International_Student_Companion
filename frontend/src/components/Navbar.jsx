import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const baseLinks = [
    { label: "News", path: "/news" },
    { label: "Community", path: "/community" },
    { label: "Reminders", path: "/reminders" },
  ];

  const roleLinks = () => {
  if (!isAuthenticated) return [];

  switch (user.role) {
    case "student":
      return [
        { label: "Housing", path: "/housing" },
      ];

    case "landlord":
      return [
        { label: "My Listings", path: "/landlord/listings" },
      ];

    case "admin":
      return [
        { label: "Admin Dashboard", path: "/admin" },
        { label: "Moderate Posts", path: "/admin/community" },
      ];

    default:
      return [];
  }
};

  const authLinks = isAuthenticated
    ? [
        { label: "Profile", path: "/profile" },
        { label: "Logout", action: logout },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  const navItems = [
    ...roleLinks(),
    ...baseLinks,
    ...authLinks.map((item) =>
      item.action
        ? { ...item, isAction: true }
        : item
    ),
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
        Student Companion
      </Typography>

      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path || undefined}
              onClick={item.isAction ? logout : undefined}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Student Companion
            </Typography>
          </Box>

          {/* DESKTOP NAV */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            {roleLinks().map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: "white" }}
              >
                {item.label}
              </Button>
            ))}

            <Button component={Link} to="/about" sx={{ color: "white" }}>
              About
            </Button>

            {isAuthenticated &&
              baseLinks.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{ color: "white" }}
                >
                  {item.label}
                </Button>
              ))}

            {isAuthenticated ? (
              <>
                <Button component={Link} to="/profile" sx={{ color: "white" }}>
                  Profile
                </Button>

                <Button onClick={logout} sx={{ color: "white" }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: "white" }}>
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
}
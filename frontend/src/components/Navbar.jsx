import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
          
          {isAuthenticated && user.role === "student" && (
            <Button component={Link} to="/housing" sx={{ color: "white" }}>
              Housing
            </Button>
          )}

          {isAuthenticated && user.role === "landlord" && (
            <>
              <Button component={Link} to="/landlord/listings" sx={{ color: "white" }}>
                My Listings
              </Button>

              <Button component={Link} to="/housing/new" sx={{ color: "white" }}>
                Add Listing
              </Button>
            </>
          )}

          {isAuthenticated && user.role === "admin" && (
            <Button component={Link} to="/admin" sx={{ color: "white" }}>
              Admin Panel
            </Button>
          )}

          {isAuthenticated && (
            <Button component={Link} to="/profile" sx={{ color: "white" }}>
              Profile
            </Button>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isAuthenticated ? (
            <>
              <Button component={Link} to="/login" variant="outlined" sx={{ color: "white", borderColor: "white" }}>
                Login
              </Button>

              <Button component={Link} to="/register" variant="contained" color="secondary">
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: "white" }}>
                Hello, {user.name}
              </Typography>

              <Button
                onClick={logout}
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
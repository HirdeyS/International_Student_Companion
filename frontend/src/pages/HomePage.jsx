import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  if (!isAuthenticated) {
    return (
      <Box sx={{ mt: 6 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Welcome to the International Student Helper
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  maxWidth: "650px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Find verified housing, manage essential paperwork deadlines,
                and access tools built specifically for international students.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Link to="/login">
                  <PrimaryButton>Login</PrimaryButton>
                </Link>

                <Link to="/register">
                  <PrimaryButton
                    style={{
                      background: "#fff",
                      color: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    Register
                  </PrimaryButton>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "350px",
                background:
                  "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                borderRadius: 4,
                boxShadow: 4,
              }}
            />
          </Grid> */}
        </Grid>

        {/* FEATURE CARDS */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            gutterBottom
          >
            What You Can Do
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Verified Housing
                </Typography>
                <Typography>
                  Browse safe listings verified by students and landlords.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Smart Reminders
                </Typography>
                <Typography>
                  Never miss deadlines for SIN, study permit, or health card
                  renewal.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Student Community
                </Typography>
                <Typography>
                  Connect with others and build your support network in Canada.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Welcome Back!
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Choose a feature to get started.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Link to="/housing">
          <Button variant="contained" size="large">
            Housing Finder
          </Button>
        </Link>

        <Link to="/reminders">
          <Button variant="contained" size="large">
            Reminder Manager
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        borderTop: "1px solid",
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "rgba(15, 23, 42, 0.9)",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.5px",
          fontWeight: 500,
        }}
      >
        © 2025 International Students Companion
      </Typography>
    </Box>
  );
}
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function HousingFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    furnished: "",
    shared: "",
    verified: "",
  });

  function updateField(field, value) {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function cleanParams(params) {
    const cleaned = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    });

    return cleaned;
  }

  function applyFilters() {
    onFilter(cleanParams(filters));
  }

  function resetFilters() {
    setFilters({
      minPrice: "",
      maxPrice: "",
      furnished: "",
      shared: "",
      verified: "",
    });

    onFilter({});
  }

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 4,
        background: "rgba(15,23,42,.75)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 15px 40px rgba(0,0,0,.35)",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={3}
      >
        <FilterAltOutlinedIcon
          sx={{ color: "#60A5FA" }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Filter Listings
        </Typography>
      </Stack>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        mb={3}
      >
        <TextField
          label="Minimum Price"
          type="number"
          fullWidth
          value={filters.minPrice}
          onChange={(e) =>
            updateField("minPrice", e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Maximum Price"
          type="number"
          fullWidth
          value={filters.maxPrice}
          onChange={(e) =>
            updateField("maxPrice", e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.furnished === "true"}
              onChange={(e) =>
                updateField(
                  "furnished",
                  e.target.checked ? "true" : ""
                )
              }
            />
          }
          label="Furnished"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.shared === "true"}
              onChange={(e) =>
                updateField(
                  "shared",
                  e.target.checked ? "true" : ""
                )
              }
            />
          }
          label="Shared Accommodation"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.verified === "true"}
              onChange={(e) =>
                updateField(
                  "verified",
                  e.target.checked ? "true" : ""
                )
              }
            />
          }
          label="Verified Listings Only"
        />
      </Stack>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        mt={3}
      >
        <Button
          variant="contained"
          onClick={applyFilters}
          sx={{
            flex: 1,
            py: 1.4,
            borderRadius: 3,
            background:
              "linear-gradient(90deg,#3B82F6,#6366F1)",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 10px 25px rgba(59,130,246,.4)",
            },
          }}
        >
          Apply Filters
        </Button>

        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{
            flex: 1,
            py: 1.4,
            borderRadius: 3,
            textTransform: "none",
            borderColor: "rgba(255,255,255,.15)",
            color: "#CBD5E1",
            "&:hover": {
              borderColor: "#3B82F6",
              background:
                "rgba(59,130,246,.08)",
            },
          }}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
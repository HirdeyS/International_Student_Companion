import { useState } from "react";
import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";

export default function HousingFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    furnished: "",
    shared: "",
    verified: "",
  });

  function updateField(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  // Removes empty filter values before sending to backend
  function cleanParams(params) {
    console.log(params);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
      <h3>Filter Listings</h3>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Min Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => updateField("minPrice", e.target.value)}
          fullWidth
        />

        <TextField
          label="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => updateField("maxPrice", e.target.value)}
          fullWidth
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.furnished === "true"}
            onChange={(e) =>
              updateField("furnished", e.target.checked ? "true" : "")
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
              updateField("shared", e.target.checked ? "true" : "")
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
              updateField("verified", e.target.checked ? "true" : "")
            }
          />
        }
        label="Verified Only"
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={resetFilters}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

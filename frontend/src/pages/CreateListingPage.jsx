import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import ErrorMessage from "../components/ui/ErrorMessage";
import {
  createListing,
  updateListing,
  getListing,
} from "../services/listingService";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function CreateListingPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    furnished: false,
    shared: false,
    availableFrom: "",
    lat: null,
    lng: null,
  });

  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // role protection
  useEffect(() => {
    if (user?.role !== "landlord") {
      navigate("/housing");
    }
  }, [user]);

  // load listing for edit
  useEffect(() => {
    async function loadListing() {
      if (!isEdit) return;

      try {
        const data = await getListing(id);

        setForm({
          title: data.title,
          description: data.description,
          address: data.address,
          price: data.price,
          furnished: data.furnished,
          shared: data.shared,
          availableFrom: data.availableFrom?.split("T")[0] || "",
          lat: data.lat || null,
          lng: data.lng || null,
        });
      } catch {
        setError("Failed to load listing");
      }
    }

    loadListing();
  }, [id]);

  // 🌍 OPTIONAL: simple geocoding using OpenStreetMap (Nominatim)
  async function geocodeAddress(address) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      const data = await res.json();

      if (data?.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    } catch (err) {
      console.warn("Geocoding failed", err);
    }

    return { lat: null, lng: null };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const coords =
      form.address ? await geocodeAddress(form.address) : { lat: null, lng: null };

    const payload = {
      ...form,
      price: Number(form.price),
      lat: coords.lat,
      lng: coords.lng,
    };

    try {
      if (isEdit) {
        await updateListing(id, payload);
      } else {
        await createListing(payload);
      }

      navigate("/housing");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save listing");
    }
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{isEdit ? "Edit Listing" : "Create a New Listing"}</h2>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        <TextInput
          label="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        <TextInput
          label="Address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
        />

        <TextInput
          label="Price ($)"
          type="number"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.furnished}
                onChange={(e) => updateField("furnished", e.target.checked)}
              />
            }
            label="Furnished"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.shared}
                onChange={(e) => updateField("shared", e.target.checked)}
              />
            }
            label="Shared Accommodation"
          />
        </Box>

        <TextInput
          label="Available From"
          type="date"
          value={form.availableFrom}
          onChange={(e) => updateField("availableFrom", e.target.value)}
          shrinkLabel
        />

        <PrimaryButton fullWidth type="submit">
          {isEdit ? "Update Listing" : "Create Listing"}
        </PrimaryButton>
      </form>
    </Card>
  );
}
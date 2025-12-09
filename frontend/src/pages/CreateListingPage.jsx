import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import ErrorMessage from "../components/ui/ErrorMessage";
import { createListing, updateListing } from "../services/listingService";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Loader } from "@googlemaps/js-api-loader";

export default function CreateListingPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    furnished: false,
    shared: false,
    availableFrom: "",
    latitude: "",
    longitude: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "landlord") {
      navigate("/housing");
    }
  }, [user]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const input = document.getElementById("address-input");
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const location = place.geometry.location;

        updateField("address", place.formatted_address);
        updateField("latitude", location.lat());
        updateField("longitude", location.lng());
      });
    });
  }, []);

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
          latitude: data.latitude || "",
          longitude: data.longitude || "",
        });
      } catch (err) {
        setError("Failed to load listing");
      }
    }

    loadListing();
  }, [id]);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      latitude: Number(form.latitude) || null,
      longitude: Number(form.longitude) || null
    };

    try {
      if (isEdit) {
        await updateListing(id, payload);
        alert("Listing updated!");
      } else {
        await createListing(payload);
        alert("Listing created!");
      }

      navigate("/housing");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    }
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Create a New Listing</h2>

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
          id={"address-input"}
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
          shrinkLabel={ true }
        />

        <TextInput
          label="Latitude"
          type="number"
          value={form.latitude}
          onChange={(e) => updateField("latitude", e.target.value)}
        />

        <TextInput
          label="Longitude"
          type="number"
          value={form.longitude}
          onChange={(e) => updateField("longitude", e.target.value)}
        />

        <PrimaryButton fullWidth type="submit">
          Create Listing
        </PrimaryButton>
      </form>
    </Card>
  );
}
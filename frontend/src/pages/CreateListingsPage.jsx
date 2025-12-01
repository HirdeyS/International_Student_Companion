import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function CreateListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    address: "",
    price: "",
    lat: "",
    lng: "",
    type: "rental"
  });

  const [suggestions, setSuggestions] = useState([]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // If typing address, fetch autocomplete suggestions
    if (name === "address" && value.length > 2) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          value
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
        });
    } else if (name === "address") {
      setSuggestions([]);
    }
  };

  // When user clicks a suggestion
  const handleSelectAddress = (item) => {
    setForm({
      ...form,
      address: item.display_name,
      lat: item.lat,
      lng: item.lon
    });

    setSuggestions([]); // hide dropdown
  };

  // Submit listing
  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    navigate("/housing");
  }

  // Dropdown styles
  const suggestionStyle = {
    border: "1px solid #ccc",
    borderTop: "none",
    maxHeight: "200px",
    overflowY: "auto",
    background: "#fff",
    position: "absolute",
    width: "100%",
    zIndex: 10
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Create Rental Listing</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "450px" }}>

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Address autocomplete */}
        <div style={{ position: "relative" }}>
          <input
            name="address"
            placeholder="Search address..."
            value={form.address}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <div style={suggestionStyle}>
              {suggestions.map((item) => (
                <div
                  key={item.place_id}
                  onClick={() => handleSelectAddress(item)}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer"
                  }}
                >
                  {item.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <input
          name="price"
          placeholder="Monthly Price"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Hidden but stored lat/lng */}
        <input type="hidden" name="lat" value={form.lat} readOnly />
        <input type="hidden" name="lng" value={form.lng} readOnly />

        <PrimaryButton type="submit">Create Listing</PrimaryButton>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

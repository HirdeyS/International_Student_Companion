import React, { useState } from "react";
import useListings from "../hooks/useListings";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function HousingPage() {
  const { data: listings, loading, error } = useListings();
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Hard-coded markers for the map
  const hardcodedListings = [
    {
      id: 1,
      title: "Downtown Apartment",
      position: [43.6532, -79.3832],
      address: "Toronto, ON",
    },
    {
      id: 2,
      title: "North York Condo",
      position: [43.7615, -79.4111],
      address: "North York, ON",
    },
    {
      id: 3,
      title: "Scarborough House",
      position: [43.7731, -79.257],
      address: "Scarborough, ON",
    },
  ];

  if (loading) return <Loader />;
  if (error) {
    console.log("Error loading listings:", error);
    return <ErrorMessage message="Failed to load listings" />;
  }

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Style for suggestions dropdown
  const suggestionBoxStyle = {
    position: "absolute",
    background: "#fff",
    border: "1px solid #ccc",
    borderTop: "none",
    width: "100%",
    maxHeight: "150px",
    overflowY: "auto",
    zIndex: 10,
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT SIDE – LISTINGS + SEARCH */}
      <div style={{ width: "45%", padding: "15px", overflowY: "auto" }}>
        <h2>Available Housing</h2>

        {/* SEARCH BAR + SUGGESTIONS */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {searchTerm.length > 0 && (
            <div style={suggestionBoxStyle}>
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div
                    key={listing._id}
                    onClick={() => setSearchTerm(listing.title)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {listing.title}
                  </div>
                ))
              ) : (
                <div style={{ padding: "8px", color: "#888" }}>
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* SHOW FILTERED LISTINGS */}
        {filteredListings.length === 0 && searchTerm.length === 0 && (
          <p>No listings found.</p>
        )}

        {filteredListings.map((listing) => (
          <Card key={listing._id} sx={{ marginBottom: 20 }}>
            <h3>{listing.title}</h3>
            <p>{listing.address}</p>
            <p>${listing.price}</p>

            <Link to={`/housing/${listing._id}`}>
              <PrimaryButton>View Details</PrimaryButton>
            </Link>
          </Card>
        ))}
      </div>

      {/* RIGHT SIDE – MAP */}
      <div style={{ width: "55%", height: "100%" }}>
        <MapContainer
          center={[43.7, -79.4]} // Toronto approx center
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* HARDCODED MARKERS ON MAP */}
          {hardcodedListings.map((loc) => (
            <Marker key={loc.id} position={loc.position}>
              <Popup>
                <b>{loc.title}</b>
                <br />
                {loc.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

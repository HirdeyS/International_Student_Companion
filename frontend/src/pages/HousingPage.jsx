import { useState, useEffect } from "react";
import useListings from "../hooks/useListings";
import HousingFilters from "../components/HousingFilters";
import HousingMap from "../components/HousingMap";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router-dom";
import { filterListings } from "../services/listingService";

import { FaFacebook, FaHome } from "react-icons/fa";

export default function HousingPage() {
  const { data: initialListings, loading, error } = useListings();

  const [listings, setListings] = useState([]);
  const [showExternal, setShowExternal] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (initialListings) {
      setListings(initialListings);
    }
  }, [initialListings]);

  async function handleFilter(params) {
    if (Object.keys(params).length === 0) {
      setListings(initialListings);
      return;
    }

    try {
      const filtered = await filterListings(params);

      setListings(filtered);

      // BUILD SEARCH TEXT
      const values = Object.values(params)
        .filter(Boolean)
        .join(" ");

      setSearchText(values);

      setShowExternal(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage message="Failed to load listings" />;
  }

  const encodedQuery = encodeURIComponent(searchText);

  const externalLinks = [
    {
      name: "Facebook Marketplace",
      icon: FaFacebook,
      url: `https://www.facebook.com/marketplace/search/?query=${encodedQuery}`,
    },
    {
      name: "Kijiji",
      icon: FaHome,
      url: `https://www.kijiji.ca/b-search.html?keywords=${encodedQuery}`,
    },
    {
      name: "Zillow",
      icon: FaHome,
      url: `https://www.zillow.com/homes/${encodedQuery}`,
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto" }}>
      <h2>Available Housing</h2>

      {/* FILTERS */}
      <HousingFilters onFilter={handleFilter} />

      {/* MAP */}
      <HousingMap listings={listings} />

      {/* LISTINGS */}
      <div style={{ marginTop: 30 }}>
        {listings.length === 0 ? (
          <Card sx={{ padding: 20, textAlign: "center" }}>
            <p>No listings available with the selected filters.</p>
          </Card>
        ) : (
          listings.map((listing) => (
            <Card key={listing._id} sx={{ marginBottom: 20 }}>
              <h3>{listing.title}</h3>

              <p>{listing.address}</p>

              <p>${listing.price}</p>

              <Link to={`/housing/${listing._id}`}>
                <PrimaryButton>
                  View Details
                </PrimaryButton>
              </Link>
            </Card>
          ))
        )}
      </div>

      {/* MORE LISTINGS BUTTON */}
      {searchText && (
        <div style={{ marginTop: 30 }}>
          <PrimaryButton onClick={() => setShowExternal(true)}>
            More Listings
          </PrimaryButton>
        </div>
      )}

      {/* EXTERNAL LINKS */}
      {showExternal && (
        <div style={{ marginTop: 20 }}>
          <h3>Search More Listings</h3>

          {externalLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <button
                key={index}
                onClick={() => window.open(link.url, "_blank")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "14px",
                  marginBottom: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Icon size={24} />

                Open on {link.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
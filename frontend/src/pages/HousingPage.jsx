// src/pages/HousingPage.jsx
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

export default function HousingPage() {
  const { data: initialListings, loading, error } = useListings();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (initialListings) {
      setListings(initialListings);
    }
  }, [initialListings]);

  async function handleFilter(params) {
    if (Object.keys(params).length === 0) {
      // no filters → show all listings
      setListings(initialListings);
      return;
    }

    try {
      const filtered = await filterListings(params);
      setListings(filtered);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load listings" />;

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto" }}>
      <h2>Available Housing</h2>

      <HousingFilters onFilter={handleFilter} />

      <HousingMap listings={listings} />

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
                <PrimaryButton>View Details</PrimaryButton>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

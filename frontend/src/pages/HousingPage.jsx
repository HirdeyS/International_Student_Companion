import useListings from "../hooks/useListings";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router-dom";

export default function HousingPage() {
  const {data: listings, loading, error} = useListings();

  if (loading) return <Loader/>
  if (error) return <ErrorMessage message="Failed to load listings"/>

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <h2>Available Housing</h2>

      {listings.map((listing) => (
        <Card key={listing._id} sx={{ marginBottom: 20}}>
          <h3>{listing.title}</h3>
          <p>{listing.address}</p>
          <p>{listing.price}</p>

          <Link to={`/housing/${listing._id}`}>
            <PrimaryButton>View Details</PrimaryButton>
          </Link>
        </Card>
      ))}
    </div>
  );
}
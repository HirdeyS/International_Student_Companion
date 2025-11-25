import { useParams } from "react-router-dom";
import { getListing } from "../services/listingService";
import useFetch from "../hooks/useFetch";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ListingDetailsPage() {
    const { id } = useParams();
    const { data: listing, loading, error} = useFetch(() => getListing(id), [id]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message="Failed to load listing" />;

    return (
        <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
            <h2>{listing.title}</h2>
            <p>{listing.address}</p>
            <p>{listing.description}</p>

            <strong>Price:</strong> ${listing.price}
            <br/>
            <strong>Furnished:</strong> {listing.furnished ? "Yes" : "No"}
            <br/>
            <strong>Shared:</strong> {listing.shared ? "Yes" : "No"}
        </Card>
    );
}
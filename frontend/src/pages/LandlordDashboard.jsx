import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListings, deleteListing } from "../services/listingService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import { Box, Button, Typography } from "@mui/material";

export default function LandlordDashboard() {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListings() {
            try {
                const allListings = await getListings();

                console.log("USER:", user);
console.log("ALL LISTINGS:", allListings);

                const mine = allListings.filter(
                    (listing) => listing.landlord?._id === user.id
                );

                setListings(mine);
            } catch (err) {
                setError("Failed to load your listings");
            } finally {
                setLoading(false);
            }
        }

        loadListings();
    }, [user]);

    async function handleDelete(id) {
        if (!window.confirm("Delete this listing?")) return;

        try {
            await deleteListing(id);
            setListings((prev) => prev.filter((l) => l._id !== id));
        } catch (err) {
            alert("Failed to delete listing");
        }
    }

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div style={{ maxWidth: 900, margin: "20px auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Listings
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Link to="/housing/new">
                    <PrimaryButton>Create New Listing</PrimaryButton>
                </Link>
            </Box>

            {listings.length === 0 ? (
                <Card sx={{ padding: 20, textAlign: "center" }}>
                    <Typography>No listings yet.</Typography>
                    <Link to="/housing/new">
                        <PrimaryButton sx={{ mt: 2 }}>Add Your First Listing</PrimaryButton>
                    </Link>
                </Card>
            ) : (
            listings.map((listing) => (
                <Card key={listing._id} sx={{ marginBottom: 2, padding: 2 }}>
                    <Typography variant="h6">{listing.title}</Typography>
                    <Typography>{listing.address}</Typography>
                    <Typography>${listing.price}</Typography>

                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button
                            component={Link}
                            to={`/housing/${listing._id}/edit`}
                            variant="outlined"
                        >
                        Edit
                        </Button>

                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleDelete(listing._id)}
                        >
                        Delete
                        </Button>
                    </Box>
                </Card>
            ))
         )}
        </div>
    );
}
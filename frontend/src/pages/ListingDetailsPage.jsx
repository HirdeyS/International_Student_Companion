import { useParams, Link } from "react-router-dom";
import { getListing } from "../services/listingService";
import useFetch from "../hooks/useFetch";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Box, Typography, Chip, Divider, Button } from "@mui/material";
import HousingMap from "../components/HousingMap";

export default function ListingDetailsPage() {
    const { id } = useParams();
    const { data: listing, loading, error} = useFetch(() => getListing(id), [id]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message="Failed to load listing" />;

    const {
        title,
        address,
        price, 
        description,
        furnished,
        shared,
        isVerified,
        availableFrom,
        latitude,
        longitude,
        distanceFromCampus,
        landlord
    } = listing;

    return (
        <Card sx={{ maxWidth: 750, margin: "20px auto", padding: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{title}</Typography>

                {isVerified && (
                    <Chip label="Verified Housing" color="success" variant="filled" />
                )}
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 1, color: "gray" }}>
                {address}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" color="primary">
                ${price}/month
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Chip label={furnished ? "Furnished" : "Not Furnished"} color={furnished ? "primary" : "default"} />
                <Chip label={shared ? "Shared" : "Private"} color={shared ? "secondary" : "default"} />
            </Box>

            {distanceFromCampus !== undefined && (
                <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                    {distanceFromCampus} km from Sheridan College
                </Typography>
            )}

            {description && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography>{description}</Typography>
                </>
            )}

            {availableFrom && (
                <Typography sx={{ mt: 2 }}>
                    <strong>Available From:</strong>{" "}
                    {new Date(availableFrom).toLocaleDateString()}
                </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            {latitude && longitude && (
            <Box 
                sx={{
                width: "100%",
                height: 350,
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 4,
                boxShadow: 1,
                position: "relative",
                zIndex: 1,  // prevents overlay
                }}
            >
                <HousingMap
                listings={[listing]}
                center={{ lat: latitude, lng: longitude }}
                zoom={15}
                />
            </Box>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    href={`mailto:${landlord?.email || ""}`}
                    disabled={!landlord?.email}
                >
                    Contact Landlord
                </Button>

                {landlord && landlord._id && (
                    <Button
                        component={Link}
                        to={`/landlord/${landlord._id}`}
                        variant="outlined"
                    >
                        View Landlord Profile
                    </Button>
                )}
            </Box>
        </Card>
    );
}
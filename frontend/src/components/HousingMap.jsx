import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
};

const defaultCenter = {
lat: 43.4695,
lng: -79.7007,
};

export default function HousingMap({ listings }) {
    const navigate = useNavigate();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [selected, setSelected] = useState(null);

    const dynamicCenter = listings.length && listings[0].latitude && listings[0].longitude
        ? { lat: listings[0].latitude, lng: listings[0].longitude }
        : defaultCenter;

    if (!isLoaded) return <p>Loading map...</p>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={dynamicCenter}
        >
            {listings.map((listing) => (
                listing.latitude && listing.longitude && (
                    <Marker
                        key={listing._id}
                        position={{ lat: listing.latitude, lng: listing.longitude }}
                        onClick={() => setSelected(listing)}
                    />
                )
            ))}

            {selected && (
                <InfoWindow
                    position={{ lat: selected.latitude, lng: selected.longitude }}
                    onCloseClick={() => setSelected(null)}
                >
                    <div>
                        <h3>{selected.title}</h3>
                        <p>{selected.address}</p>
                        <Link to={`/housing/${selected._id}`} style={{ color: "blue" }}>
                            View Listing
                        </Link>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
} 
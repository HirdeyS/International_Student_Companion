import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// fix default icon issue in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function HousingMap({ listings }) {
  const defaultCenter = [43.6532, -79.3832]; // Toronto fallback

  return (
    <div style={{ height: "400px", width: "100%", marginTop: 20 }}>
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listings
          .filter((l) => l.lat && l.lng)
          .map((listing) => (
            <Marker key={listing._id} position={[listing.lat, listing.lng]}>
              <Popup>
                <strong>{listing.title}</strong>
                <br />
                {listing.address}
                <br />
                ${listing.price}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
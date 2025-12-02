import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SingleListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(res => res.json())
      .then(data => setListing(data));
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div>
      <h2>{listing.title}</h2>
      <p>{listing.address}</p>
      <p>Price: {listing.price}</p>
    </div>
  );
}

import api from "./api";

//Get all listings
export async function getListings() {
    const res = await api.get("/listings");
    return res.data;
}

//Get individual listing
export async function getListing(id) {
    const res = await api.get(`/listings/${id}`);
    return res.data;
}

//Get listings for a landlord
export async function getListingsByLandlord(id) {
    const res = await api.get(`/listings/landlord/${id}`);
    return res.data;
}

//Create listing
export async function createListing(data) {
    const res = await api.post("/listings", data);
    return res.data;
}

//Update listing
export async function updateListing(id, data) {
    const res = await api.put(`/listings/${id}`, data);
    return res.data;
}

//Delete listing
export async function deleteListing(id) {
    const res = await api.delete(`/listings/${id}`);
    return res.data;
}

//Filter listings by query params
export async function filterListings(params) {
    const res = await api.get("/listings/filter", {
        params,
    });

    return res.data;
}
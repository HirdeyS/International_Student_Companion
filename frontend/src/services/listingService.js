import api from "./api";

export async function getListings() {
    const res = await api.get("/listings");
    return res.data;
}

export async function getListing(id) {
    const res = await api.get(`/listings/${id}`);
    return res.data;
}

export async function getListingsByLandlord(id) {
    const res = await api.get(`/listings/landlord/${id}`);
    return res.data;
}

export async function createListing(data) {
    const res = await api.post("/listings", data);
    return res.data;
}

export async function updateListing(id, data) {
    const res = await api.put(`/listings/${id}`, data);
    return res.data;
}

export async function deleteListing(id) {
    const res = await api.delete(`/listings/${id}`);
    return res.data;
}

export async function filterListings(params) {
    const res = await api.get("/listings/filter", {
        params,
    });

    return res.data;
}
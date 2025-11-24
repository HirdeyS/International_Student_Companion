import api from "./api";

export async function login(email, password) {
    const res = await api.post("/login", {email, password});
    return res.data;
}

export async function register(data) {
    const res = await api.post("/register", data);
    return res.data;
}

export async function getMe() {
    const res = await api.get("/profile/me");
    return res.data;
}
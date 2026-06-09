import api from "./api";

//logins the user and returns the user object and the JWT token
export async function login(email, password) {
    const res = await api.post("/login", {email, password});
    return res.data;
}

//registers a new user
export async function register(data) {
    const res = await api.post("/register", data);
    return res.data;
}

//gets the current authenticated user
export async function getMe() {
    const res = await api.get("/profile/me");
    return res.data;
}

//updates the current user profile
export async function updateProfile(data) {
    const res = await api.put("/profile/me", data);
    return res.data;
}
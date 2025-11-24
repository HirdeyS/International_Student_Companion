import { useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import { login } from "../services/authService"
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <Card sx={{ maxWidth: 400, margin: "20px auto" }}>
            <h2>Login</h2>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleLogin}>
                <TextInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <PrimaryButton type="submit" fullWidth>
                    Login
                </PrimaryButton>
            </form>
        </Card>
    );
}
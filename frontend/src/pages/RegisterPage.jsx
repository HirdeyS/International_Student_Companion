import { useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        try {
            await register({name, email, password});
            alert("Account created. Check your email to verify your account.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    }

    return (
        <Card sx={{maxWidth: 450, margin: "20px auto"}}>
            
            <h2>Create Account</h2>

            {error && <ErrorMessage message={error}/>}

            <form onSubmit={handleRegister}>
                <TextInput name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <TextInput name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextInput name="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
                <PrimaryButton fullWidth type="submit">
                    Register
                </PrimaryButton>
            
            </form>
        </Card>
    )
}
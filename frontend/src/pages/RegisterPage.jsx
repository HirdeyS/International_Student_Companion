import { useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { maxWidth } from "@mui/system";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        try {
            await register(form);
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
                <TextInput name="name" label="Name" value={form.name} onChange={handleChange}/>
                <TextInput name="email" label="Email" value={form.email} onChange={handleChange}/>
                <TextInput name="password" label="Password" value={form.password} onChange={handleChange}/>
            
                <PrimaryButton fullWidth type="submit">
                    Register
                </PrimaryButton>
            
            </form>
        </Card>
    )
}
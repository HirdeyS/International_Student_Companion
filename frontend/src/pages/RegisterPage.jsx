import { useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    function updateField(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        try {
            await register(form);
            alert("Account created. Check your email to verify your account.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    }

    return (
        <Card sx={{maxWidth: 450, margin: "20px auto"}}>
            
            <h2>Create Account</h2>

            {error && <ErrorMessage message={error}/>}

            <form onSubmit={handleRegister}>
                <TextInput 
                label="Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                />

                <TextInput 
                label="Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                />

                <TextInput 
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                />

                <FormControl sx={{ mt: 2 }}>
                <FormLabel>User Type</FormLabel>
                <RadioGroup
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}
                >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="landlord" control={<Radio />} label="Landlord" />
                </RadioGroup>
                </FormControl>

                <PrimaryButton fullWidth type="submit">
                Register
                </PrimaryButton>
            </form>
        </Card>
    )
}
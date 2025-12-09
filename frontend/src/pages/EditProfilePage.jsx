import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMe } from "../services/authService";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Typography, Divider, Chip } from "@mui/material";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMe();
        setForm(data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    try {
      const updated = await updateProfile(form);
      setUser(updated);
      alert("Profile updated!");
    } catch {
      setError("Failed to update profile");
    }
  }

  if (loading) return <Loader />;
  if (!form) return <ErrorMessage message="Profile not found" />;

  return (
    <Card sx={{ maxWidth: 700, margin: "20px auto", padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Profile
      </Typography>

      <Chip label={form.role.toUpperCase()} color="primary" sx={{ mb: 2 }} />

      <Divider sx={{ my: 2 }} />

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSave}>

        {/* SHARED FIELDS */}
        <TextInput
          label="Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <TextInput
          label="Email (cannot be changed)"
          value={form.email}
          disabled
        />

        {/* STUDENT FIELDS */}
        {form.role === "student" && (
          <>
            <TextInput
              label="Program of Study"
              value={form.program || ""}
              onChange={(e) => updateField("program", e.target.value)}
            />

            <TextInput
              label="Country of Origin"
              value={form.countryOfOrigin || ""}
              onChange={(e) => updateField("countryOfOrigin", e.target.value)}
            />

            <TextInput
              label="Bio"
              value={form.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
            />
          </>
        )}

        {/* LANDLORD FIELDS */}
        {form.role === "landlord" && (
          <>
            <TextInput
              label="Business Name"
              value={form.businessName || ""}
              onChange={(e) => updateField("businessName", e.target.value)}
            />

            <TextInput
              label="Phone Number"
              value={form.phoneNumber || ""}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
            />

            <TextInput
              label="Website"
              value={form.website || ""}
              onChange={(e) => updateField("website", e.target.value)}
            />

            <TextInput
              label="About"
              value={form.about || ""}
              onChange={(e) => updateField("about", e.target.value)}
            />
          </>
        )}

        <PrimaryButton fullWidth type="submit">
          Save Changes
        </PrimaryButton>
      </form>
    </Card>
  );
}
import { useEffect, useState } from "react";
import { getMe } from "../services/authService";
import api from "../services/api";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [idFile, setIdFile] = useState(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getMe();
                setProfile(data);
            } catch {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    async function updateProfile() {
        try {
            const res = await api.put("/profile/me", profile);
            setProfile(res.data);
            alert("Profile updated");
        } catch {
            setError("Update failed");
        }
    }

    async function uploadID() {
        if (!idFile) return;

        const formData = new FormData();
        formData.append("idDocument", idFile);

        await api.post(`/id/${profile._id}/upload`, formData);
        alert("ID uploaded");
    }

    if (loading) return <Loader/>;
    if (error) return <ErrorMessage message={error}/>

    return (
        <Card sx={{maxWidth: 500, margin: "20px auto"}}>
            <h2>Your Profile</h2>
        
            <TextInput
                label="Name"
                value={profile.name || ""}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
            />

            <TextInput
                label="Bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}      
            />

            <PrimaryButton onClick={updateProfile} fullWidth>
                Save Profile    
            </PrimaryButton>     
        

            <hr/>

            <h3>Upload ID Document</h3>
            <input type="file" onChange={(e) => setIdFile(e.target.files[0])} />
            <PrimaryButton onClick={uploadID} fullWidth sx={{mt: 2}}>
                Upload
            </PrimaryButton>
        </Card>
    );
}
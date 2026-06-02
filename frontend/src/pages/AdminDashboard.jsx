import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Admin Dashboard</h2>

      <Card sx={{ padding: 20, marginBottom: 20 }}>
        <h3>Welcome, {user?.name}</h3>
        <p>Use this panel to manage the platform.</p>
      </Card>

      <Card sx={{ padding: 20 }}>
        <h3>Moderation Tools</h3>

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <Link to="/admin/community">
            <PrimaryButton>
              Moderate Community Posts
            </PrimaryButton>
          </Link>
        </div>
      </Card>
    </div>
  );
}
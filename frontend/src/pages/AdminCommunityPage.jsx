import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import ErrorMessage from "../components/ui/ErrorMessage";

import {
  getPendingPosts,
  approvePost,
  rejectPost,
} from "../services/communityService";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminCommunityPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [reasons, setReasons] = useState({});
  const [error, setError] = useState("");

  // protect route
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/community");
    }
  }, [user]);

  useEffect(() => {
    loadPending();
  }, []);

  async function loadPending() {
    try {
      const data = await getPendingPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to load pending posts");
    }
  }

  async function handleApprove(id) {
    await approvePost(id);
    loadPending();
  }

  async function handleReject(id) {
    const reason = reasons[id];
    if (!reason) return alert("Reason required");

    await rejectPost(id, reason);

    setReasons((prev) => ({ ...prev, [id]: "" }));
    loadPending();
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Community Moderation</h2>

      {error && <ErrorMessage message={error} />}

      {posts.length === 0 && <p>No pending posts 🎉</p>}

      {posts.map((post) => (
        <Card key={post._id} sx={{ marginBottom: 2 }}>
          <h3>{post.user?.name}</h3>
          <p>{post.content}</p>
          <p>Group: {post.group}</p>

          <div style={{ marginTop: 10 }}>
            <PrimaryButton onClick={() => handleApprove(post._id)}>
              Approve
            </PrimaryButton>
          </div>

          <div style={{ marginTop: 10 }}>
            <TextInput
              label="Rejection reason"
              value={reasons[post._id] || ""}
              onChange={(e) =>
                setReasons({
                  ...reasons,
                  [post._id]: e.target.value,
                })
              }
            />

            <PrimaryButton
              onClick={() => handleReject(post._id)}
              style={{ marginTop: 10 }}
            >
              Reject
            </PrimaryButton>
          </div>
        </Card>
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import PrimaryButton from "../components/ui/PrimaryButton";

import ForumPost from "../components/ForumPost";

import {
  getPosts,
  createPost,
  likePost,
  reportPost,
} from "../services/communityService";

export default function CommunityPage() {
  const [posts, setPosts] =
    useState([]);

  const [content, setContent] =
    useState("");

  const [group, setGroup] =
    useState("General");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data =
      await getPosts();

    setPosts(data);
  }

  async function handleCreate() {
    await createPost({
      content,
      group,
    });

    setContent("");

    alert(
      "Post submitted for approval"
    );
  }

  async function handleLike(id) {
    await likePost(id);

    loadPosts();
  }

  async function handleReport(id) {
    await reportPost(id);

    alert("Reported");

    loadPosts();
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "20px auto",
      }}
    >
      <h2>Community Forum</h2>

      <Card sx={{ marginBottom: 3 }}>
        <h3>Create Post</h3>

        <TextInput
          label="Group"
          value={group}
          onChange={(e) =>
            setGroup(
              e.target.value
            )
          }
        />

        <TextInput
          label="Post Content"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
        />

        <PrimaryButton
          onClick={handleCreate}
        >
          Submit Post
        </PrimaryButton>
      </Card>

      {posts.map((post) => (
        <ForumPost
          key={post._id}
          post={post}
          onLike={handleLike}
          onReport={handleReport}
        />
      ))}

      <p style={{ color: "#666" }}>
  Posts are reviewed before appearing publicly.
</p>
    </div>
  );
}
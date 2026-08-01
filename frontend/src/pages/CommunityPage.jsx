import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

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
  const [posts, setPosts] = useState([]);

  const [content, setContent] = useState("");

  const [group, setGroup] = useState("General");


  useEffect(() => {
    loadPosts();
  }, []);


  async function loadPosts() {
    const data = await getPosts();

    setPosts(data);
  }


  async function handleCreate() {
    await createPost({
      content,
      group,
    });

    setContent("");

    alert("Post submitted for approval");
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
    <Container
      maxWidth="md"
      sx={{
        py: 5,
      }}
    >

      {/* HEADER */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={4}
      >
        <ForumOutlinedIcon
          sx={{
            fontSize: 35,
            color: "primary.main",
          }}
        />

        <Typography
          variant="h3"
          fontWeight={800}
        >
          Community Forum
        </Typography>
      </Stack>


      {/* CREATE POST */}
      <Card
        sx={{
          mb: 4,
          p: 3,
        }}
      >

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Create Post
        </Typography>


        <Stack spacing={2}>

          <TextInput
            label="Group"
            value={group}
            onChange={(e) =>
              setGroup(e.target.value)
            }
          />


          <TextInput
            label="Post Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />


          <PrimaryButton
            onClick={handleCreate}
          >
            Submit Post
          </PrimaryButton>

        </Stack>

      </Card>



      {/* POSTS */}
      <Stack spacing={3}>

        {posts.length > 0 ? (
          posts.map((post) => (
            <ForumPost
              key={post._id}
              post={post}
              onLike={handleLike}
              onReport={handleReport}
            />
          ))
        ) : (
          <Card
            sx={{
              textAlign:"center",
              py:5,
            }}
          >
            <Typography
              color="text.secondary"
            >
              No posts available yet. Be the first to start a discussion!
            </Typography>
          </Card>
        )}

      </Stack>



      {/* FOOTER NOTE */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt:4,
          textAlign:"center",
        }}
      >
        Posts are reviewed before appearing publicly.
      </Typography>


    </Container>
  );
}
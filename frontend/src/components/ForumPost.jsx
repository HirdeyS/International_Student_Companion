import {
  Avatar,
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import Card from "./ui/Card";
import PrimaryButton from "./ui/PrimaryButton";

export default function ForumPost({
  post,
  onLike,
  onReport,
}) {
  return (
    <Card
      sx={{
        mb: 3,
        p: 3,
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 35px rgba(0,0,0,.35)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={2}
      >
        <Avatar
          sx={{
            bgcolor: "#3B82F6",
            fontWeight: "bold",
          }}
        >
          {post.user?.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Box flex={1}>
          <Typography
            fontWeight={700}
            color="white"
          >
            {post.user?.name}
          </Typography>

          <Chip
            label={post.group}
            size="small"
            sx={{
              mt: 0.5,
              bgcolor: "#1E40AF",
              color: "white",
            }}
          />
        </Box>
      </Stack>

      <Typography
        sx={{
          color: "#CBD5E1",
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        {post.content}
      </Typography>

      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        mb={3}
      >
        <Typography
          sx={{
            color: "#94A3B8",
            fontWeight: 600,
          }}
        >
          👍 {post.likes.length} Likes
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontWeight: 600,
          }}
        >
          💬 {post.comments.length} Comments
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        mb={3}
      >
        <PrimaryButton
          startIcon={<ThumbUpAltOutlinedIcon />}
          onClick={() => onLike(post._id)}
        >
          Like
        </PrimaryButton>

        <PrimaryButton
          color="error"
          startIcon={<ReportOutlinedIcon />}
          onClick={() => onReport(post._id)}
        >
          Report
        </PrimaryButton>
      </Stack>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
          mb: 2,
        }}
      />

      <Typography
        variant="subtitle1"
        fontWeight={700}
        color="white"
        mb={2}
      >
        <ChatBubbleOutlineIcon
          sx={{
            mr: 1,
            fontSize: 20,
            verticalAlign: "middle",
          }}
        />
        Comments
      </Typography>

      <Stack spacing={2}>
        {post.comments.map((comment) => (
          <Box
            key={comment._id}
            sx={{
              display: "flex",
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,.03)",
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#6366F1",
                fontSize: 14,
              }}
            >
              {comment.user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                fontWeight={600}
                color="white"
              >
                {comment.user?.name}
              </Typography>

              <Typography
                color="#CBD5E1"
              >
                {comment.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
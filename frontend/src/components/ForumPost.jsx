import Card from "./ui/Card";
import PrimaryButton from "./ui/PrimaryButton";

export default function ForumPost({
  post,
  onLike,
  onReport,
  onComment,
}) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <h3>{post.user?.name}</h3>

      <p>{post.content}</p>

      <p>
        Group: {post.group}
      </p>

      <p>
        Likes: {post.likes.length}
      </p>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <PrimaryButton
          onClick={() =>
            onLike(post._id)
          }
        >
          Like
        </PrimaryButton>

        <PrimaryButton
          onClick={() =>
            onReport(post._id)
          }
        >
          Report
        </PrimaryButton>
      </div>

      <div
        style={{
          marginTop: 15,
        }}
      >
        <strong>Comments</strong>

        {post.comments.map((comment) => (
          <p key={comment._id}>
            <strong>
              {comment.user?.name}
            </strong>
            : {comment.text}
          </p>
        ))}
      </div>
    </Card>
  );
}
import Card from "./ui/Card";
import PrimaryButton from "./ui/PrimaryButton";
import { Typography, Chip, Stack } from "@mui/material";

export default function NewsCard({ article }) {
  return (
    <Card sx={{ marginBottom: 3 }}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" fontWeight="bold">
            {article.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            {new Date(article.pubDate).toLocaleDateString()}
          </Typography>
        </div>

        <Chip
          label={article.category}
          sx={{ width: "fit-content" }}
        />

        <Typography variant="body1">
          {article.summary}
        </Typography>

        <PrimaryButton
          onClick={() => window.open(article.link, "_blank")}
        >
          Read Full Article
        </PrimaryButton>
      </Stack>
    </Card>
  );
}
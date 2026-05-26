import useNews from "../hooks/useNews";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import NewsCard from "../components/NewsCard";
import { Typography } from "@mui/material";

export default function NewsPage() {
  const { data: news, loading, error } = useNews();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ marginBottom: 3 }}
      >
        Immigration & Student News
      </Typography>

      {news.length === 0 ? (
        <ErrorMessage message="No news articles available." />
      ) : (
        news.map((article) => (
          <NewsCard
            key={article._id}
            article={article}
          />
        ))
      )}
    </div>
  );
}
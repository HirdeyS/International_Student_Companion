import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";

export default function useNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const news = await getNews();
        setData(news);
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
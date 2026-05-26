import api from "./api";

export async function getNews() {
  const response = await api.get("/news");
  return response.data;
}
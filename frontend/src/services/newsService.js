import api from "./api";

//Fetch latest news
export async function getNews() {
  const response = await api.get("/news");
  return response.data;
}
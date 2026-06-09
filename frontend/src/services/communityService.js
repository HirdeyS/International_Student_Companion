import api from "./api";

//gets approved posts (optionally filtered by groups)
export async function getPosts(group = "") {
  const res = await api.get("/community", {params: group ? { group } : {}});
  return res.data.posts;
}

//create a new post (pending approval)
export async function createPost(data) {
  const res = await api.post("/community", data);
  return res.data;
}

//Toggles like on post
export async function likePost(id) {
  const res = await api.put(`/community/${id}/like`);
  return res.data;
}

//Adds comment to post
export async function addComment(id, text) {
  const res = await api.post(`/community/${id}/comment`, {text});
  return res.data;
}

//Reports a post
export async function reportPost(id) {
  const res = await api.post(`/community/${id}/report`);
  return res.data;
}

//Admin: get pending posts
export async function getPendingPosts() {
  const res = await api.get("/community/pending");
  return res.data;
}

//Admin: approve post
export async function approvePost(id) {
  const res = await api.put(`/community/${id}/approve`);
  return res.data;
}

//Admin: reject post
export async function rejectPost(id, reason) {
  const res = await api.put(`/community/${id}/reject`, {reason});
  return res.data;
}
import api from "./api";

export async function getPosts(group = "") {
  const res = await api.get("/community", {
    params: group ? { group } : {},
  });

  return res.data.posts;
}

export async function createPost(data) {
  const res = await api.post(
    "/community",
    data
  );

  return res.data;
}

export async function likePost(id) {
  const res = await api.put(
    `/community/${id}/like`
  );

  return res.data;
}

export async function addComment(id, text) {
  const res = await api.post(
    `/community/${id}/comment`,
    {
      text,
    }
  );

  return res.data;
}

export async function reportPost(id) {
  const res = await api.post(
    `/community/${id}/report`
  );

  return res.data;
}

export async function getPendingPosts() {
  const res = await api.get("/community/pending");
  return res.data;
}

export async function approvePost(id) {
  const res = await api.put(`/community/${id}/approve`);
  return res.data;
}

export async function rejectPost(id, reason) {
  const res = await api.put(`/community/${id}/reject`, {
    reason,
  });
  return res.data;
}
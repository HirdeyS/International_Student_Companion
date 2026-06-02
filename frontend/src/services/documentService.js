import api from "./api";

export async function initializeDocuments(userId) {
  const res = await api.post("/documents/initialize", {
    userId,
  });

  return res.data;
}

export async function getDocuments(userId) {
  const res = await api.get(`/documents/${userId}`);

  return res.data;
}

export async function updateDocument(userId, documentId, expiryDate) {
  const res = await api.put(
    `/documents/${userId}/${documentId}`,
    {
      expiryDate,
    }
  );

  return res.data;
}

export async function addDocument(userId, document) {
  const res = await api.post(
    `/documents/${userId}/add`,
    document
  );

  return res.data;
}

export async function deleteDocument(userId, documentId) {
  const res = await api.delete(
    `/documents/${userId}/${documentId}`
  );

  return res.data;
}
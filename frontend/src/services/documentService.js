import api from "./api";

// Initialize default documents
export async function initializeDocuments(userId) {
  const res = await api.post("/documents/initialize", {
    userId,
  });

  return res.data;
}

// Get all documents
export async function getDocuments(userId) {
  const res = await api.get(`/documents/${userId}`);
  return res.data;
}

// Update expiry date
export async function updateDocument(
  userId,
  documentId,
  expiryDate
) {
  const res = await api.put(
    `/documents/${userId}/${documentId}`,
    {
      expiryDate,
    }
  );

  return res.data;
}

// Add custom document
export async function addDocument(userId, document) {
  const res = await api.post(
    `/documents/${userId}/add`,
    document
  );

  return res.data;
}

// Delete custom document
export async function deleteDocument(
  userId,
  documentId
) {
  const res = await api.delete(
    `/documents/${userId}/${documentId}`
  );

  return res.data;
}
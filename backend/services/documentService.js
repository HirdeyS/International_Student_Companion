const API_URL = "http://localhost:5000/api/documents";

export const initializeDocuments = async (userId) => {
  const response = await fetch(`${API_URL}/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  return response.json();
};

export const getDocuments = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`);
  return response.json();
};

export const updateDocument = async (
  userId,
  documentId,
  expiryDate
) => {
  const response = await fetch(
    `${API_URL}/${userId}/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiryDate }),
    }
  );

  return response.json();
};

export const addDocument = async (
  userId,
  name,
  expiryDate
) => {
  const response = await fetch(
    `${API_URL}/${userId}/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        expiryDate,
      }),
    }
  );

  return response.json();
};

export const deleteDocument = async (
  userId,
  documentId
) => {
  const response = await fetch(
    `${API_URL}/${userId}/${documentId}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};
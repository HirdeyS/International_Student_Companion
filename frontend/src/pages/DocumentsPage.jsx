import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";
import {
  getDocuments,
  initializeDocuments,
  updateDocument,
  addDocument,
  deleteDocument,
} from "../services/documentService";

import { useAuth } from "../context/AuthContext";

export default function DocumentsPage() {
  const { user } = useAuth();

  const [documents, setDocuments] = useState([]);

  const [newName, setNewName] = useState("");
  const [newExpiry, setNewExpiry] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      await initializeDocuments(user.id);

      const data = await getDocuments(user.id);

      setDocuments(data.documents);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDateChange(documentId, date) {
    await updateDocument(
      user.id,
      documentId,
      date
    );

    loadDocuments();
  }

  async function handleAdd() {
    await addDocument(user.id, {
      name: newName,
      expiryDate: newExpiry,
    });

    setNewName("");
    setNewExpiry("");

    loadDocuments();
  }

  async function handleDelete(id) {
    await deleteDocument(user.id, id);

    loadDocuments();
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Document Reminders</h2>

      {documents.map((doc) => (
        <Card
          key={doc._id}
          sx={{ marginBottom: 2 }}
        >
          <h3>{doc.name}</h3>

          <TextInput
            type="date"
            value={
              doc.expiryDate
                ? doc.expiryDate.split("T")[0]
                : ""
            }
            shrinkLabel
            onChange={(e) =>
              handleDateChange(
                doc._id,
                e.target.value
              )
            }
          />

          {!doc.isRequired && (
            <PrimaryButton
              onClick={() =>
                handleDelete(doc._id)
              }
            >
              Delete
            </PrimaryButton>
          )}
        </Card>
      ))}

      <Card sx={{ marginTop: 3 }}>
        <h3>Add Custom Document</h3>

        <TextInput
          label="Document Name"
          value={newName}
          onChange={(e) =>
            setNewName(e.target.value)
          }
        />

        <TextInput
          label="Expiry Date"
          type="date"
          shrinkLabel
          value={newExpiry}
          onChange={(e) =>
            setNewExpiry(e.target.value)
          }
        />

        <PrimaryButton onClick={handleAdd}>
          Add Document
        </PrimaryButton>
      </Card>
    </div>
  );
}
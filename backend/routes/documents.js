import express from "express";
const router = express.Router();

import UserDocuments from "../models/UserDocuments.js";

const requiredDocuments = [
  "Study Permit",
  "SIN Number",
  "Passport",
  "Driver's License",
  "English Proficiency",
];



/*
========================================
Initialize Required Documents
========================================
*/
router.post("/initialize", async (req, res) => {
  try {
    const { userId } = req.body;

    let existingUser = await UserDocuments.findOne({
      userId,
    });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const documents = requiredDocuments.map((doc) => ({
      name: doc,
      expiryDate: null,
      isRequired: true,
    }));

    const newUserDocs = await UserDocuments.create({
      userId,
      documents,
    });

    res.status(201).json(newUserDocs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



/*
========================================
Get All Documents
========================================
*/
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const documents = await UserDocuments.findOne({
      userId,
    });

    if (!documents) {
      return res.status(404).json({
        message: "No documents found",
      });
    }

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



/*
========================================
Update Document Expiry Date
========================================
*/
router.put("/:userId/:documentId", async (req, res) => {
  try {
    const { userId, documentId } = req.params;

    const { expiryDate } = req.body;

    const userDocs = await UserDocuments.findOne({
      userId,
    });

    if (!userDocs) {
      return res.status(404).json({
        message: "User documents not found",
      });
    }

    const document = userDocs.documents.id(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.expiryDate = expiryDate;

    await userDocs.save();

    res.status(200).json({
      message: "Document updated successfully",
      data: userDocs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



/*
========================================
Add Custom Document
========================================
*/
router.post("/:userId/add", async (req, res) => {
  try {
    const { userId } = req.params;

    const { name, expiryDate } = req.body;

    if (!name || !expiryDate) {
      return res.status(400).json({
        message: "Name and expiry date are required",
      });
    }

    const userDocs = await UserDocuments.findOne({
      userId,
    });

    if (!userDocs) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    userDocs.documents.push({
      name,
      expiryDate,
      isRequired: false,
    });

    await userDocs.save();

    res.status(201).json({
      message: "Custom document added",
      data: userDocs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



/*
========================================
Delete Custom Document
========================================
*/
router.delete("/:userId/:documentId", async (req, res) => {
  try {
    const { userId, documentId } = req.params;

    const userDocs = await UserDocuments.findOne({
      userId,
    });

    if (!userDocs) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const document = userDocs.documents.id(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    if (document.isRequired) {
      return res.status(400).json({
        message: "Required documents cannot be deleted",
      });
    }

    userDocs.documents.pull(documentId);

    await userDocs.save();

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
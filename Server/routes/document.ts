import express from "express";
import {
  saveDocument,
  getDocument,
  getAllDocuments,
  deleteDocument,
  shareDocument,
} from "../controllers/document";
import { authenticateToken } from "../middlewares/token";
const router = express.Router();

router.post("/saveDocument", saveDocument);
router.post("/deleteDocument", deleteDocument);
router.get("/getAllDocs", getAllDocuments);
router.get("/:id", getDocument);
router.post("/shareDocument", shareDocument);

export default router;

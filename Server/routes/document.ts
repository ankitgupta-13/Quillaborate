import express from "express";
import {
  saveDocument,
  getDocument,
  getAllDocuments,
  deleteDocument,
} from "../controllers/document";
import { authenticateToken } from "../middlewares/token";
const router = express.Router();

router.post("/saveDocument", saveDocument);
router.post("/deleteDocument", deleteDocument);
router.get("/getAllDocs", getAllDocuments);
router.get("/:id", getDocument);

export default router;

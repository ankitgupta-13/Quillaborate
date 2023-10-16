import express from "express";
import { saveDocument, getDocument, getAllDocuments } from "../controllers/document";
import {authenticateToken} from '../middlewares/token';
const router = express.Router();

router.post("/saveDocument", saveDocument);
router.get("/getAllDocs",authenticateToken,getAllDocuments)
router.get("/:id", getDocument);

export default router;


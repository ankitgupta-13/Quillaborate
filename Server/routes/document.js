"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const document_1 = require("../controllers/document");
const token_1 = require("../middlewares/token");
const router = express_1.default.Router();
router.post("/saveDocument", document_1.saveDocument);
router.get("/getAllDocs", token_1.authenticateToken, document_1.getAllDocuments);
router.get("/:id", document_1.getDocument);
exports.default = router;

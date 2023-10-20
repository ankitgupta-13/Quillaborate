"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdmin = exports.shareDocument = exports.deleteDocument = exports.getDocument = exports.getAllDocuments = exports.saveDocument = void 0;
const Document_1 = __importDefault(require("../models/Document"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const saveDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document = new Document_1.default(req.body);
    try {
        yield document.save();
        res.status(201).json(document);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.saveDocument = saveDocument;
const getAllDocuments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield Document_1.default.find({ creator: req.headers.authorization });
        res.status(200).json({ docs: docs });
    }
    catch (err) {
        res.status(402).json({ mess: err.message });
    }
});
exports.getAllDocuments = getAllDocuments;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield Document_1.default.findById(req.params.id).populate("creator");
        res.status(200).json(document);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getDocument = getDocument;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Document_1.default.deleteOne({ _id: req.body.docId });
        res.status(200).json({ mess: "Document deleted successfully!" });
    }
    catch (err) {
        res.status(400).json({ mess: err.message });
    }
});
exports.deleteDocument = deleteDocument;
const shareDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, senderEmail, receiverEmail } = req.body;
    yield shareMail(url, receiverEmail);
    return res.json({ mess: "messageSent" });
});
exports.shareDocument = shareDocument;
const shareMail = (url, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: "Request for Collaborative Edits on the Document",
        text: `I hope this message finds you well. I am reaching out with an opportunity for collaboration on the document. Your insights and expertise would be immensely valuable in enhancing this document.

    To facilitate this collaboration, I would like to share the document with you.
    Please find the document accessible via the following link: ${url}`,
    };
    yield transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});
const sendAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docId, contributorId, contributorName, creatorId, url, creatorEmail, } = req.body;
    yield adminMail(url, creatorEmail, contributorName);
    return res.json({ mess: "messageSent" });
});
exports.sendAdmin = sendAdmin;
const adminMail = (url, receiverEmail, contributorName) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: "Review and Incorporation of Contributor's Changes in the Document",
        text: `I hope this message finds you well. I am writing to inform you that ${contributorName} has made some changes to document and we believe these changes could be valuable additions to our database. We kindly request your review and consideration.
    Please find the document accessible via the following link: ${url}`,
    };
    yield transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});

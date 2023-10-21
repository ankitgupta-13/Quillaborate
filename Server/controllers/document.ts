import Document from "../models/Document";
import { Request, Response, NextFunction } from "express";
import nodeMailer from "nodemailer";

export const saveDocument = async (req: Request, res: Response) => {
  const document = new Document(req.body);
  try {
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const docs = await Document.find({ creator: req.headers.authorization });
    res.status(200).json({ docs: docs });
  } catch (err) {
    res.status(402).json({ mess: err.message });
  }
};

export const getDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id).populate("creator");
    res.status(200).json(document);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    await Document.deleteOne({ _id: req.body.docId });
    res.status(200).json({ mess: "Document deleted successfully!" });
  } catch (err) {
    res.status(400).json({ mess: err.message });
  }
};

export const shareDocument = async (req: Request, res: Response) => {
  const { url, senderEmail, receiverEmail } = req.body;
  await shareMail(url, receiverEmail);
  return res.json({ mess: "messageSent" });
};

const shareMail = async (url, receiverEmail) => {
  const transporter = nodeMailer.createTransport({
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
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendAdmin = async (req: Request, res: Response) => {
  const {
    docId,
    contributorId,
    contributorName,
    creatorId,
    url,
    creatorEmail,
  } = req.body;
  await adminMail(url, creatorEmail, contributorName);
  return res.json({ mess: "messageSent" });
};

const adminMail = async (url, receiverEmail, contributorName) => {
  const transporter = nodeMailer.createTransport({
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
    subject:
      "Review and Incorporation of Contributor's Changes in the Document",
    text: `I hope this message finds you well. I am writing to inform you that ${contributorName} has made some changes to document and we believe these changes could be valuable additions to our database. We kindly request your review and consideration.
Please find the document accessible via the following link: ${url}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

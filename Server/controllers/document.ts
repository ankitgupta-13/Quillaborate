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
    const document = await Document.findById(req.params.id);
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
  mailer(url, senderEmail, receiverEmail);
};

const mailer = (url, senderEmail, receiverEmail) => {
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
    from: senderEmail,
    to: receiverEmail,
    subject: "URL for the document",
    text: `Your URL is ${url}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

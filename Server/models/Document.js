"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DocumentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    docxBase64: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    collaborators: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Document", DocumentSchema);

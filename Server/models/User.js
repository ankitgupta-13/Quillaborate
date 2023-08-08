"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
        unique: false,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", UserSchema);

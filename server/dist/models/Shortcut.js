"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shortcutSchema = new mongoose_1.default.Schema({
    appId: Number,
    categoryId: Number,
    action: String,
    createDate: Date,
    keys: {
        win: String,
        osx: String
    },
    pins: Number,
    comment: String
}, { timestamps: true });
const Shortcut = mongoose_1.default.model("Shortcut", shortcutSchema);
exports.default = Shortcut;
//# sourceMappingURL=Shortcut.js.map
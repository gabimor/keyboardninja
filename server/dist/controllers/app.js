"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Shortcut_1 = __importDefault(require("../models/Shortcut"));
/**
 * GET /app
 * Get all shortcuts of an app
 */
exports.getApp = (req, res) => {
    Shortcut_1.default.find({ appId: req.params.id }, (err, docs) => {
        res.status(200).json(docs);
    });
};
//# sourceMappingURL=app.js.map
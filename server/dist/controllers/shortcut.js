"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Shortcut_1 = __importDefault(require("../models/Shortcut"));
/**
 * POST /shortcut
 * Create a new shortcut
 */
exports.postShortcut = (req, res) => {
    req.assert("appId", "no appId").isNumeric();
    req.assert("categoryId", "categoryId").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/error");
    }
    const shortcut = new Shortcut_1.default({
        appId: req.body.appId,
        categoryId: req.body.categoryId,
        action: req.body.action,
        keys: {
            win: req.body.win,
            osx: req.body.osx,
        },
        comment: req.body.comment
    });
    shortcut.save(err => console.log(err));
    res.status(200).json(req.body);
};
//# sourceMappingURL=shortcut.js.map
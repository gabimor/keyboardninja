import { Response, Request, NextFunction } from "express";
import Shortcut from "../models/Shortcut";

/**
 * POST /shortcut
 * Create a new shortcut
 */
export let postShortcut = (req: Request, res: Response) => {
  req.assert("appId", "no appId").isNumeric();
  req.assert("categoryId", "categoryId").isNumeric();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/error");
  }

  const shortcut = new Shortcut({
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

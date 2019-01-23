import { Response, Request, NextFunction } from "express";
import Shortcut from "../models/Shortcut";

/**
 * GET /app
 * Get all shortcuts of an app
 */
export let getApp = (req: Request, res: Response) => {
  Shortcut.find({appId: req.params.id}, (err, docs) => {
    res.status(200).json(docs);
  });
};

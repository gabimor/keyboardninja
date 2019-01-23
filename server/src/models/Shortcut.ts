import mongoose from "mongoose";

export type ShortcutModel = mongoose.Document & {
  appId: string,
  categoryId: string,
  action: string,
  createDate: Date,

  keys: {
    win: string,
    osx: string
  },

  pins: string,
  comment: string
};

const shortcutSchema = new mongoose.Schema({
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

const Shortcut = mongoose.model("Shortcut", shortcutSchema);
export default Shortcut;

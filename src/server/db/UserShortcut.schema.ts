import mongoose, { Schema } from "mongoose";

export const App = mongoose.model(
  "apps",
  new Schema({
    name: String,
    icon: String,
    sections: [
      new Schema({
        name: String,
      }),
    ],
    oss: [String],
    shortcuts: [
      new Schema({
        action: String,
        sectionId: Schema.ObjectId,
        win: String,
        mac: String,
        isHtml: Boolean,
        note: String,
      }),
    ],
  })
);

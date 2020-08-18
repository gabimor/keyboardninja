import mongoose, { Schema } from "mongoose";

// mongoose.set("debug", function(coll, method, query, doc) {
//   console.log(1231231)
//   console.log(coll, method, query, doc)
// })

// getAppUrlName, shortcut.getPins, getIdByUrlName
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

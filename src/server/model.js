import mongoose from "mongoose"

const { Schema } = mongoose

export const User = mongoose.model(
  "users",
  new Schema({
    email: String,
    password: String,
  })
)
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
      }),
    ],
  })
)

export const AppCategory = mongoose.model(
  "app_categories",
  new Schema({
    name: String,
    icon: String,
    apps: [new Schema({ name: String, icon: String })],
  })
)

export const UserShortcut = mongoose.model(
  "userShortcut",
  new Schema({
    userId: String,
    appId: String,
    shortcutId: String,
  })
)

// export const AppSection = mongoose.model(
//   "appsSections",
//   new Schema({
//     name: String,
//     appId: String,
//     order: Number,
//     os: Number,
//   })
// )

// export const Shortcut = mongoose.model(
//   "shortcuts",
//   new Schema({
//     action: String,
//     sectionId: String,
//     keys: String,
//     order: Number,
//   })
// )

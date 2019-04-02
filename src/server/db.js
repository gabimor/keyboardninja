import mongoose from "mongoose"
import { User, AppCategory, UserShortcut } from "./models"

mongoose.connect("mongodb://localhost:27017/keyboardninja", {
  useNewUrlParser: true,
})

// mongoose.set("debug", true)

export async function getAppCategories() {
  return AppCategory.find().lean()
}

export async function setPin(userId, appId, shortcutId, isPinned) {
  let update

  if (isPinned) {
    update = { $addToSet: { shortcuts: [shortcutId] } }
  } else {
    update = { $pull: { shortcuts: shortcutId } }
  }

  await UserShortcut.findOneAndUpdate({ userId, appId }, update, {
    upsert: true,
  })
}

export function findUser(email, password) {
  return User.findOne({ email, password })
}

export async function signupUser(email, password) {
  let user = await User.findOne({ email, password })

  if (!user) {
    user = new User({ email, password })
    await user.save()
  }

  return user
}

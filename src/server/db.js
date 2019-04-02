import mongoose from "mongoose"
import { User, UserShortcut } from "./models"

mongoose.connect("mongodb://localhost:27017/keyboardninja", {
  useNewUrlParser: true,
})

// mongoose.set("debug", true)

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

export async function signupUser(email, password) {
  let user = await User.findOne({ email, password })

  if (!user) {
    user = new User({ email, password })
    await user.save()
  }

  return user
}

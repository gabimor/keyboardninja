export const GoogleStrategyConfigToken = "GoogleStrategyConfig";

export const googleStrategyConfig = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: process.env.APP_URL + "/auth/google/",
  scope: ["email", "profile"],
};

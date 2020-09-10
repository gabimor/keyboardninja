export const FacebookStrategyConfigToken = "FacebookStrategyConfig";

export const facebookStrategyConfig = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.APP_URL + "/auth/facebook/",
  scope: ["email"],
  profileFields: ["email", "name"],
};

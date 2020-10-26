export const GoogleStrategyConfigToken = "GoogleStrategyConfig";
import * as consts from "@shared/consts";

export const googleStrategyConfig = {
  clientID: consts.GOOGLE_APP_ID,
  clientSecret: consts.GOOGLE_APP_SECRET,
  callbackURL: consts.APP_URL + "/auth/google/",
  scope: ["email", "profile"],
};

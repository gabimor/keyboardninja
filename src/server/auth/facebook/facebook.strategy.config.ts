export const FacebookStrategyConfigToken = "FacebookStrategyConfig";
import * as consts from "@shared/consts";

export const facebookStrategyConfig = {
  clientID: consts.FB_APP_ID,
  clientSecret: consts.FB_APP_SECRET,
  callbackURL: consts.APP_URL + "/auth/facebook/",
  scope: ["email"],
  profileFields: ["email", "name"],
};

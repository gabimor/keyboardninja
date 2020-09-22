import { Injectable } from "@nestjs/common";
import { App } from "@server/app/App.schema";
import { OSs } from "@src/types/OSs.enum";
import { JwtUser } from "@src/types/User.type";
import { Request } from "express";

@Injectable()
export class HomeService {
  getAppOS(app: App, req: Request): OSs {
    const { os: cookieOS } = req.cookies;

    let appOS: OSs = cookieOS;

    if (!appOS) {
      appOS = req.headers["user-agent"].toLowerCase().includes("win")
        ? OSs.Win
        : OSs.Mac;
    }

    if (!app.oss.includes(appOS)) {
      appOS = app.oss[0];
    }

    return appOS;
  }

  getJwtUser(user: Express.User): JwtUser {
    if (!user) return;

    const jwtUser: JwtUser = user;

    return {
      firstName: jwtUser.firstName,
      lastName: jwtUser.lastName,
    };
  }
}

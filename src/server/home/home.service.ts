import { Injectable } from "@nestjs/common";
import { App } from "@src/types/schemas/App.schema";
import { OSs } from "@src/types/OSs.enum";
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
}

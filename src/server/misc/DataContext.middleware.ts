import { RequestAuth } from "@defs/RequestAuth";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { AppService } from "@server/app/app.service";
import { Response } from "express";

@Injectable()
export class DataContextMiddleware implements NestMiddleware {
  constructor(private appsService: AppService) {}

  async use(req: RequestAuth, res: Response, next: Function) {
    req.context = {
      appCategories: await this.appsService.getAppCategories(),
      user: req.user,
    };

    next();
  }
}

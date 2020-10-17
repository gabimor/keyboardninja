import { RequestAuth } from "@defs/RequestAuth";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { AppService } from "@server/app/app.service";
import { NextFunction, Response } from "express";

@Injectable()
export class DataContextMiddleware implements NestMiddleware {
  constructor(private appsService: AppService) {}

  async use(req: RequestAuth, res: Response, next: NextFunction) {
    req.context = {
      appCategories: await this.appsService.getAppCategories(),
      user: req.user,
    };

    next();
  }
}

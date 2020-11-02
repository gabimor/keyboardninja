import { renderPage } from "@server/misc/pageTemplate/renderPage";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { page500 } from "../pageTemplate/page500";
import { getTitle } from "@shared/utils";
import { RequestAuth } from "@defs/RequestAuth";
import * as Sentry from "@sentry/node";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<RequestAuth>();

    console.log("GlobalExceptionFilter says:", exception);
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(exception);
    }

    const status = exception.getStatus();
    if (req.url.startsWith("/api") || req.url.startsWith("/auth")) {
      res.status(status).json({
        status,
        payload: exception.getResponse(),
      });
      return;
    } else {
      if (status === 404) {
        res
          .status(status)
          .send(await renderPage(req, getTitle(req.url), "/404"));
        return;
      } else {
        res.send(page500());
        return;
      }
    }
  }
}

process.on("uncaughtException", (err) => {
  console.log("Caught exception: " + err);
});

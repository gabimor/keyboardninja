import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { page500 } from "../pageTemplate/page500";
import { RequestAuth } from "@defs/RequestAuth";
import * as Sentry from "@sentry/node";
import * as consts from "@shared/consts";
import { page404 } from "../pageTemplate/page404";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<RequestAuth>();

    if (consts.NODE_ENV === consts.SENTRY_REPORT_ENV) {
      Sentry.captureException(exception);
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      payload = exception.getResponse();
    }

    if (status === HttpStatus.NOT_FOUND) {
      res.status(HttpStatus.NOT_FOUND).send(page404());

      return;
    } else {
      console.log("GlobalExceptionFilter says:", exception);

      if (req.url.startsWith("/api") || req.url.startsWith("/auth")) {
        res.status(status).json({
          status,
          payload,
        });
        return;
      } else {
        res.send(page500());
      }
    }

    throw new HttpException(
      "GlobalExceptionFilter, should not get here",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

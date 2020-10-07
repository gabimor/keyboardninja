import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response, Request } from "express";
import { page500 } from "../pageTemplate/page500";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: any = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception?.code === "ENOENT") {
      return response.redirect("/404");
    }

    if (request.method !== "GET") {
      response.status(status).json({
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }
    response.send(page500()).sendStatus(500);
  }
}

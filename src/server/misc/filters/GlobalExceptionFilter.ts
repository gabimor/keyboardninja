import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";
import { page500 } from "../pageTemplate/page500";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception.code === "ENOENT") {
      status = exception.code;
    }

    if (request.method !== "GET") {
      response.status(status).json({
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      response.send(page500()).sendStatus(status);
    } else if (status === "ENOENT") {
      response.redirect("/404");
    }
  }
}

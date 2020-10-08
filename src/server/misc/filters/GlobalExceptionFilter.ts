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

    console.log(exception);

    let status: any = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      if (request.method !== "GET") {
        response.status(status).json({
          status,
          payload: exception.getResponse(),
        });
      }
    } else if (exception?.code === "ENOENT") {
      response.redirect("/404");
    } else {
      // response.redirect("/404");
      response.send(page500());
    }
  }
}

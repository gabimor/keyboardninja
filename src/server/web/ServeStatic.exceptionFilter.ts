import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class ServeStaticExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === "ENOENT") {
      response.redirect("/404");
    } else {
      console.log(exception);
      response.redirect("/500");
      // const status =
      //   exception instanceof HttpException
      //     ? exception.getStatus()
      //     : HttpStatus.INTERNAL_SERVER_ERROR;
      // response.sendStatus(status);
    }
  }
}

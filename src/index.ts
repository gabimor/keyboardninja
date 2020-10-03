import { NestFactory } from "@nestjs/core";
import { AppModule } from "@server/app.module";
import cookieParser from "cookie-parser";
import * as helmet from "helmet";
import * as csurf from "csurf";
// @ts-ignore
import expressListRoutes from "express-list-routes";
import * as rateLimit from "express-rate-limit";
import { ValidationPipe } from "@nestjs/common";
import { ServeStaticExceptionFilter } from "@server/web/ServeStatic.exceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServeStaticExceptionFilter());
  // app.use(helmet());
  // TODO: configure csrf & helmet
  // app.use(csurf());
  app.use(
    "/auth/",
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
    })
  );

  await app.listen(process.env.PORT || 3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, "API:", router));
  console.log("------------------");

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}
bootstrap();

import * as Sentry from "@sentry/node";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@server/app.module";
import cookieParser from "cookie-parser";
// @ts-ignore
import expressListRoutes from "express-list-routes";
import * as rateLimit from "express-rate-limit";
import { GlobalExceptionFilter } from "./misc/filters/GlobalExceptionFilter";
import { ClassValidationPipe } from "./misc/filters/ClassValidationPipe";
import { join } from "path";
import * as consts from "@shared/consts";

async function bootstrap() {
  Sentry.init({
    dsn: consts.SENTRY_BACK_END_DSN,
    tracesSampleRate: consts.SENTRY_TRACE_SAMPLE_RATE,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ClassValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
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

  app.useStaticAssets(getPublicPath());

  const getEnv = (c: string) => process.env[c];
  const port = getEnv("PORT") || 3000;
  await app.listen(port);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, "API:", router));
  console.log("Listening on port: " + port);

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}

function getPublicPath() {
  const publicUrl =
    process.env.NODE_ENV === "production" ? "public" : "../public";
  return join(__dirname, publicUrl);
}
bootstrap();

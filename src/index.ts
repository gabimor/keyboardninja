import { NestFactory } from "@nestjs/core";
import { AppModule } from "@server/app.module";
import cookieParser from "cookie-parser";
//@ts-ignore
import expressListRoutes from "express-list-routes";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, "API:", router));

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}
bootstrap();

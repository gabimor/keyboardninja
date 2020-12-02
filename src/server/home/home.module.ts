import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppsModule } from "@server/app/app.module";
import { SendGridModule } from "@ntegral/nestjs-sendgrid";
import * as consts from "@shared/consts";
import { HomeService } from "./home.service";

@Module({
  imports: [
    AppsModule,
    SendGridModule.forRoot({
      apiKey: consts.SENDGRID_API_KEY,
    }),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

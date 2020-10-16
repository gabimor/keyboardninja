import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppsModule } from "@server/app/app.module";

@Module({
  imports: [AppsModule],
  controllers: [HomeController],
})
export class HomeModule {}

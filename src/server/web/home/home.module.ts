import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { AppsModule } from "@server/app/app.module";

@Module({
  imports: [AppsModule],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {
}

import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "@server/app/AppCategory.schema";
import { App, AppSchema } from "@server/app/App.schema";
import { HomeService } from "./home.service";
import { AppService } from "@server/app/app.service";
import { AppsModule } from "@server/app/app.module";

@Module({
  imports: [AppsModule],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

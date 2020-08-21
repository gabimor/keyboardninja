import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "@server/db/AppCategory.schema";
import { App, AppSchema } from "@server/db/App.schema";
import { HomeService } from "./home.service";
import { AppsService } from "@server/apps/apps.service";
import { AppsModule } from "@server/apps/apps.module";

@Module({
  imports: [
    AppsModule,
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

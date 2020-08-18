import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "../../db/AppCategory.schema";
import { HomeService } from "./home.service";
import { App, AppSchema } from "../../db/App.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

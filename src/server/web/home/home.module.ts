import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "../../db/AppCategory.schema";
import { DBService } from "../../db/db.service";
import { App, AppSchema } from "../../db/App.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [DBService],
  controllers: [HomeController],
})
export class HomeModule {}

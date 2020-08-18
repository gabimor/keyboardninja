import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "../../db/AppCategory.schema";
import { HomeService } from "./home.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

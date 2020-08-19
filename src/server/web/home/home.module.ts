import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "@server/db/AppCategory.schema";
import { DBService } from "@server/db/db.service";
import { App, AppSchema } from "@server/db/App.schema";
import { HomeService } from "./home.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [DBService, HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

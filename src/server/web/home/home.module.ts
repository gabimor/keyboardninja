import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { AppCategory, AppCategorySchema } from "@server/db/AppCategory.schema";
import { DBService } from "@server/db/db.service";
import { App, AppSchema } from "@server/db/App.schema";

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

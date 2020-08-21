import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { App, AppSchema } from "@server/db/App.schema";
import { AppCategory, AppCategorySchema } from "@server/db/AppCategory.schema";
import { AppsService } from "./apps.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [AppsService],
  exports: [AppsService],
})
export class AppsModule {}

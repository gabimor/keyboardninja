import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { App, AppSchema } from "@server/app/App.schema";
import { AppCategory, AppCategorySchema } from "@server/app/AppCategory.schema";
import { AppService } from "./app.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}

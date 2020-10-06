import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { App, AppSchema } from "@src/types/schemas/App.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "@src/types/schemas/AppCategory.schema";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UserApps, UserAppsSchema } from "@src/types/schemas/UserApps.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
      { name: UserApps.name, schema: UserAppsSchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}

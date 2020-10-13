import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { App, AppSchema } from "@defs/schemas/App.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "@defs/schemas/AppCategory.schema";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UserApps, UserAppsSchema } from "@defs/schemas/UserApps.schema";
import { User, UserSchema } from "@defs/schemas/User.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
      { name: UserApps.name, schema: UserAppsSchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserApps.name, schema: UserAppsSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}

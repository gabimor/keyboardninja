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
import { AppRequest, AppRequestSchema } from "@defs/schemas/AppRequest.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: App.name, schema: AppSchema },
      { name: AppRequest.name, schema: AppRequestSchema },
      { name: AppCategory.name, schema: AppCategorySchema },
      { name: User.name, schema: UserSchema },
      { name: UserApps.name, schema: UserAppsSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}

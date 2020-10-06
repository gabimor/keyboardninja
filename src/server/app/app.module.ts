import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { App, AppSchema } from "@src/types/schemas/App.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "@src/types/schemas/AppCategory.schema";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import {
  UserShortcut,
  UserShortcutSchema,
} from "@src/types/schemas/UserShortcut.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppCategory.name, schema: AppCategorySchema },
      { name: UserShortcut.name, schema: UserShortcutSchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { App } from "@src/types/schemas/App.schema";
import { AppCategory } from "@src/types/schemas/AppCategory.schema";
import { UserShortcut } from "@src/types/schemas/UserShortcut.schema";
import { Model } from "mongoose";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>,
    @InjectModel(UserShortcut.name)
    private userShortcutsModel: Model<UserShortcut>,
    @InjectModel(App.name) private appModel: Model<App>
  ) {}

  async getAppCategory(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }

  async getAppByName(name: string): Promise<App> {
    return this.appModel.findOne({ url: name }).lean();
  }

  // async starShortcut(
  //   userId: string,
  //   shortcutId: string
  // ): Promise<UserShortcut> {
  //   //     const user = await this.userModel.findOne({ email });
  //   //     return user && user.toJSON ? user.toJSON() : undefined;
  // }
}

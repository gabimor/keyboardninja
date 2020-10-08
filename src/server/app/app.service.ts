import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { App } from "@src/types/schemas/App.schema";
import { AppCategory } from "@src/types/schemas/AppCategory.schema";
import { UserApps } from "@src/types/schemas/UserApps.schema";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { User } from "@src/types/schemas/User.schema";
import { ToggleStarReturnType } from "@src/types/misc";
@Injectable()
export class AppService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>,
    @InjectModel(UserApps.name)
    private userAppsModel: Model<UserApps>,
    @InjectModel(App.name) private appModel: Model<App>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getAppCategories(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }

  async getAppByName(name: string, userId: string): Promise<App> {
    const app = await this.appModel.findOne({ url: name }).lean();

    let userApp;
    if (userId) {
      userApp = this.userAppsModel.find({ userId, appId: app._id });
    }

    return app;
  }

  async toggleStar(
    userId: ObjectId,
    appId: ObjectId,
    shortcutId: ObjectId
  ): ToggleStarReturnType {
    const app = await this.appModel.findById(appId);

    if (!app) {
      throw new BadRequestException("didn't find app with id:" + appId);
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new BadRequestException("didn't find user with id:" + userId);
    }

    const shortcut = app.shortcuts.find((s) => shortcutId.equals(s._id));

    if (!shortcut) {
      throw new BadRequestException(
        `appId: ${appId} doesn't have shortcutId: ${shortcutId}`
      );
    }

    const userApp = await this.userAppsModel.findOneAndUpdate(
      { userId, appId },
      {},
      { upsert: true, new: true, useFindAndModify: false }
    );

    const shortcutIndex = userApp.shortcutIds.indexOf(shortcutId);
    const isStarred = shortcutIndex > -1;

    if (isStarred) {
      userApp.shortcutIds.splice(shortcutIndex, 1);

      shortcut.stars--;
    } else {
      userApp.shortcutIds.push(shortcutId);
      shortcut.stars++;
    }

    await userApp.save();
    await app.save();

    return { isStarred: !isStarred, stars: shortcut.stars };
  }

  async unstarShortcut(
    userId: ObjectId,
    appId: ObjectId,
    shortcutId: ObjectId
  ): Promise<UserApps> {
    return this.userAppsModel.findOneAndUpdate(
      { userId, appId },
      {
        userId,
        appId,
        $addToSet: { shortcutIds: shortcutId },
      },
      { upsert: true, useFindAndModify: false, new: true }
    );
  }
}

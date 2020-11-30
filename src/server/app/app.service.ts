import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { App } from "@defs/schemas/App.schema";
import { AppCategory } from "@defs/schemas/AppCategory.schema";
import { UserApps } from "@defs/schemas/UserApps.schema";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { User } from "@defs/schemas/User.schema";
import { ToggleStarReturnType } from "@defs/misc";
import { OSs } from "@defs/OSs.enum";
import { Request } from "express";
import { AppRequest } from "@defs/schemas/AppRequest.schema";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>,
    @InjectModel(UserApps.name)
    private userAppsModel: Model<UserApps>,
    @InjectModel(App.name) private appModel: Model<App>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AppRequest.name) private appRequesstModel: Model<AppRequest>
  ) {}

  async getAppCategories(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }

  async addUserApp(app: App, userId: string) {
    const userApp = await this.userAppsModel
      .findOne({ appId: app._id, userId: new ObjectId(userId) })
      .lean();

    if (userApp) {
      for (const shortcutId of userApp.shortcutIds) {
        const shortcut = app.shortcuts.find(
          (e) => e._id.toString() === shortcutId.toHexString()
        );
        shortcut.isStarred = true;
      }
    }
  }
  getAppOS(app: App, req: Request): OSs {
    const { os: cookieOS } = req.cookies;

    let appOS: OSs = cookieOS;

    if (!appOS) {
      appOS = req.headers["user-agent"]?.toLowerCase()?.includes("win")
        ? OSs.Win
        : OSs.Mac;
    }

    if (!app?.oss?.includes(appOS)) {
      appOS = app.oss[0];
    }

    return appOS;
  }

  async getAppByName(name: string): Promise<App | undefined> {
    return await this.appModel.findOne({ url: name }).lean();
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

  async appRequest(appName: string) {
    const appRequestResult = await this.appRequesstModel.findOne({ appName });

    if (appRequestResult) {
      appRequestResult.votes++;
    } else {
      throw new Error();
    }

    appRequestResult.save();
  }
}

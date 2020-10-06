import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { App } from "@src/types/schemas/App.schema";
import { AppCategory } from "@src/types/schemas/AppCategory.schema";
import { UserApps } from "@src/types/schemas/UserApps.schema";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
@Injectable()
export class AppService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>,
    @InjectModel(UserApps.name)
    private userAppsModel: Model<UserApps>,
    @InjectModel(App.name) private appModel: Model<App>
  ) {}

  async getAppCategory(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }

  async getAppByName(name: string): Promise<App> {
    return this.appModel.findOne({ url: name }).lean();
  }

  async starShortcut(
    userId: ObjectId,
    appId: ObjectId,
    shortcutId: ObjectId
  ): Promise<void> {
    const userApps = await this.userAppsModel.findById(userId);

    // const userApp = await this.userAppsModel.findByIdAndUpdate(userId,)
    //   { _id: userId, apps: { $elemMatch: { _id: appId } } },
    //   {
    //     $addToSet: { "apps.$.shortcutIds": shortcutId },
    //   },
    //   { useFindAndModify: false, upsert: true }
    // );

    if (!userApps) {
      await this.userAppsModel.create({
        _id: userId,
        apps: [
          {
            _id: appId,
            shortcutIds: [shortcutId],
          },
        ],
      });
    } else {
      const app = userApps.apps.find(
        (app) => app._id.toHexString() === appId.toHexString()
      );

      if (!app.shortcutIds.includes(shortcutId)) {
        app.shortcutIds.push(shortcutId);
        await userApps.save();
      }
    }
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { App } from "@server/db/App.schema";
import { AppCategory } from "@server/db/AppCategory.schema";
import { Model } from "mongoose";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>,
    @InjectModel(App.name) private appModel: Model<App>
  ) {}

  async getAppCategory(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }

  async getAppByName(name: string): Promise<App> {
    return this.appModel.findOne({ url: name }).lean();
  }
}

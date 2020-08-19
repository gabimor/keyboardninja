import { InjectModel } from "@nestjs/mongoose";
import { AppCategory } from "./AppCategory.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { App } from "./App.schema";

@Injectable()
export class DBService {
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

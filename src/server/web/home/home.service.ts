import { InjectModel } from "@nestjs/mongoose";
import { AppCategory } from "../../db/AppCategory.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(AppCategory.name) private appCategoryModel: Model<AppCategory>
  ) {}

  async get(): Promise<AppCategory[]> {
    return this.appCategoryModel.find().lean();
  }
}

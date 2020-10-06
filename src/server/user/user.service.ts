import { Injectable } from "@nestjs/common";
import { User } from "@server/user/User.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
// import { Shortcut } from "@src/types/Shortcut.type";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async starShortcut(userId: string, shortcutId: string): Promise<Shortcut> {
  //   const user = await this.userModel.findOne({ email });
  //   return user && user.toJSON ? user.toJSON() : undefined;
  // }
}

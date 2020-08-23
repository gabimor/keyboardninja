import { Injectable } from "@nestjs/common";
import { UserType } from "@src/types/User.type";
import emailValidator from "email-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@src/consts";
import { User } from "@server/db/User.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne((user: User) => user.email === email);
  }

  async signup(email: string, password: string) {
    if (!emailValidator.validate(email)) {
      throw new Error("email is not valid");
    } else if (
      !password ||
      password.length >= PASSWORD_MIN_LENGTH ||
      password.length <= PASSWORD_MAX_LENGTH
    ) {
      throw new Error("password is not valid");
    } else if (this.userModel.findOne({ email })) {
      throw new Error("user exists");
    } else {
      this.userModel.create();
    }
  }
}

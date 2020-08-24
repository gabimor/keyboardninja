import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as emailValidator from "email-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@src/consts";
import { User } from "@server/user/User.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async signup(email: string, password: string) {
    if (!emailValidator.validate(email)) {
      throw new HttpException(
        "email is not valid",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else if (
      password.length < PASSWORD_MIN_LENGTH ||
      password.length > PASSWORD_MAX_LENGTH
    ) {
      throw new HttpException(
        "password is not valid",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else if (this.userModel.findOne({ email })) {
      throw new HttpException("user exists", HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      this.userModel.create({ email, password });
    }
  }
}

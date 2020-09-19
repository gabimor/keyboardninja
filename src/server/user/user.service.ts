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
    const user = await this.userModel.findOne({ email });

    return user && user.toJSON ? user.toJSON() : undefined;
  }

  async signup(email: string, password: string): Promise<Partial<User>> {
    // if (!emailValidator.validate(email)) {
    //   throw new HttpException(
    //     "email is not valid: " + email,
    //     HttpStatus.BAD_REQUEST
    //   );
    // } else if (
    //   !password ||
    //   password.length < PASSWORD_MIN_LENGTH ||
    //   password.length > PASSWORD_MAX_LENGTH
    // ) {
    //   throw new HttpException("password is not valid", HttpStatus.BAD_REQUEST);
    // } else if (await this.userModel.findOne({ email })) {
    //   throw new HttpException("user exists: " + email, HttpStatus.BAD_REQUEST);
    // }

    if (await this.userModel.findOne({ email })) {
      throw new HttpException("user exists: " + email, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.create({
      email,
      password,
    });

    return { _id: user._id, email: user.email };
  }

  async signupFB(
    facebookId: string,
    email?: string,
    firstName?: string,
    lastName?: string
  ): Promise<Partial<User>> {
    let user = await this.userModel.findOne({ facebookId });
    if (user) return user;

    user = await this.userModel.findOne({ email });

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.facebookId = facebookId;

      await user.save();
    } else {
      user = await this.userModel.create({
        email,
        firstName,
        lastName,
        facebookId,
      });
    }

    return user;
  }

  async signupGoogle(
    googleId: string,
    email?: string,
    firstName?: string,
    lastName?: string
  ): Promise<Partial<User>> {
    let user = await this.userModel.findOne({ googleId });
    if (user) return user;

    user = await this.userModel.findOne({ email });

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.googleId = googleId;

      await user.save();
    } else {
      user = await this.userModel.create({
        email,
        firstName,
        lastName,
        googleId,
      });
    }

    return user;
  }
}

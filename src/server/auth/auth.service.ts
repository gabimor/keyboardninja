import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { hash } from "bcrypt";
import { bcryptSaltRound } from "@server/auth/consts";
import { JwtService } from "@nestjs/jwt";
import { User } from "@server/user/User.schema";
import { compare } from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export enum SocialType {
  Facebook = "facebook",
  Google = "google",
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userModel.findOne({ email }).lean();

    if (!user) return null;

    const passwordMatch = await compare(pass, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(email: string, password: string): Promise<Partial<User>> {
    if (await this.userModel.findOne({ email }).lean()) {
      throw new HttpException("user exists: " + email, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, bcryptSaltRound);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    return { _id: user._id, email: user.email };
  }

  async signupSocial(
    socialId: string,
    socialType: SocialType,
    email?: string,
    firstName?: string,
    lastName?: string
  ): Promise<Partial<User>> {
    const idFieldName = socialType + "Id";

    let user = await this.userModel.findOne({ [idFieldName]: socialId });
    if (user) return user;

    user = await this.userModel.findOne({ email });

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;

      if (socialType === SocialType.Facebook) {
        user.facebookId = socialId;
      } else if (socialType === SocialType.Google) {
        user.googleId = socialId;
      }

      await user.save();
    } else {
      user = await this.userModel.create({
        email,
        firstName,
        lastName,
        [idFieldName]: socialId,
      });
    }

    return user;
  }

  generateJwt(user: Partial<User>) {
    if (!user._id) {
      throw new BadRequestException("user doesn't include _id property");
    }

    const { _id, email, firstName, lastName, facebookId, googleId } = user;

    return this.jwtService.sign({
      _id,
      email,
      firstName,
      lastName,
      facebookId,
      googleId,
    });
  }
}

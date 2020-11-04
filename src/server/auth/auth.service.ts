import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { hash } from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "@shared/consts";
import { JwtService } from "@nestjs/jwt";
import { User } from "@defs/schemas/User.schema";
import { compare } from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtUser } from "@defs/User.type";
import { CreateUserDto as SignUpUserDto } from "../../defs/DTOs/createUser.dto";

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

    if (!user || !user?.password) return null;

    const passwordMatch = await compare(pass, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async signup(signUpUserDto: SignUpUserDto): Promise<User> {
    if (await this.userModel.findOne({ email: signUpUserDto.email }).lean()) {
      throw new HttpException("Email already taken", HttpStatus.ACCEPTED);
    }

    const hashedPassword = await hash(
      signUpUserDto.password,
      BCRYPT_SALT_ROUNDS
    );

    const user = await this.userModel.create({
      firstName: signUpUserDto.firstName,
      lastName: signUpUserDto.lastName,
      email: signUpUserDto.email,
      password: hashedPassword,
    });

    return user;
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

    return this.jwtService.sign(getJwtUser(user));
  }
}

export function getJwtUser(user: Partial<User>): JwtUser {
  const { _id, email, firstName, lastName, facebookId, googleId } = user;
  return {
    _id,
    email,
    firstName,
    lastName,
    facebookId,
    googleId,
  };
}

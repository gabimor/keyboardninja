import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@server/user/User.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findOne(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwt(user: Partial<User>) {
    if (!user?._id) {
      throw new BadRequestException("user doesn't include _id property");
    }

    const { _id, email, firstName, lastName } = user;

    return this.jwtService.sign({ _id, email, firstName, lastName });
  }
}

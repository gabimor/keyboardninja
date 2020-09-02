import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "@server/user/user.dto";
import { User } from "@server/user/User.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException("no email or password supplied");
    } else if (await this.userService.findOne(email)) {
      throw new BadRequestException("user exists");
    } else if (password.length < 6 || password.length > 12) {
      throw new BadRequestException("password not leagal");
    }
  }

  async generateJwt(user: Partial<User>) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

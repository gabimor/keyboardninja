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

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateJwt(user: Partial<User>) {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }
}

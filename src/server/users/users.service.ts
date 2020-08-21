import { Injectable } from "@nestjs/common";
import { UserType } from "@src/types/User.type";
import emailValidator from "email-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@src/consts";

@Injectable()
export class UsersService {
  private readonly users: UserType[];

  constructor() {
    this.users = [
      {
        email: "john",
        password: "changeme",
      },
      {
        email: "chris",
        password: "secret",
      },
      {
        email: "maria",
        password: "guess",
      },
    ];
  }

  async findOne(email: string): Promise<UserType | undefined> {
    return this.users.find((user) => user.email === email);
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
    } else {
    }
  }
}

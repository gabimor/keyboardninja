import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "./User.schema";
import { getModelToken } from "@nestjs/mongoose";
import { userModelMock } from "./__mocks__/user.schema";
import { EXISTING_EMAIL, NEW_EMAIL, BAD_EMAIL } from "./__mocks__/user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("should not allow signup of bad email", async () => {
    const email = BAD_EMAIL;
    const password = "goodpassword";

    await expect(userService.signup(email, password)).rejects.toThrow(
      "email is not valid"
    );
  });

  it("should not allow short password", async () => {
    const email = NEW_EMAIL;
    const password = "good";

    await expect(userService.signup(email, password)).rejects.toThrow(
      "password is not valid"
    );
  });

  it("should signup a valid user", async () => {
    const email = NEW_EMAIL;
    const password = "12345678";

    await expect(userService.signup(email, password)).resolves.not.toThrow();
    expect(userModelMock.findOne).toHaveBeenCalledWith({ email });
    expect(userModelMock.create).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it("should not allow registering an existing email", async () => {
    const email = EXISTING_EMAIL;

    await expect(userService.signup(email, "12345678")).rejects.toThrow(
      "user exists"
    );
    expect(userModelMock.findOne).toHaveBeenCalledWith({ email });
  });
});

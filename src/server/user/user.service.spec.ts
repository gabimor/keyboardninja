import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "../../server/db/User.schema";
import { getModelToken } from "@nestjs/mongoose";

const EXISTING_EMAIL = "existing@email.com";

const mockUserService = {
  findOne: jest.fn(({ email }) => {
    if (email === EXISTING_EMAIL) return true;
  }),
  create: jest.fn(),
};

describe("UsersService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it("should not allow signup of bad email", async () => {
    const email = "bademail";
    const password = "goodpassword";

    await expect(userService.signup(email, password)).rejects.toThrow(
      "email is not valid"
    );
  });

  it("should not allow short password", async () => {
    const email = "good@email.com";
    const password = "good";

    await expect(userService.signup(email, password)).rejects.toThrow(
      "password is not valid"
    );
  });

  it("should signup a valid user", async () => {
    const email = "good@email.com";
    const password = "12345678";

    await expect(userService.signup(email, password)).resolves.not.toThrow();
    expect(mockUserService.findOne).toHaveBeenCalledWith({ email });
    expect(mockUserService.create).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it("should not allow registering an existing email", async () => {
    const email = EXISTING_EMAIL;

    await expect(userService.signup(email, "12345678")).rejects.toThrow(
      "user exists"
    );
    expect(mockUserService.findOne).toHaveBeenCalledWith({ email });
  });
});

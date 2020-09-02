import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "../user/User.schema";
import { userModelMock } from "../user/__mocks__/user.schema";
import { getModelToken } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import {
  EXISTING_EMAIL,
  EXISTING_PASSWORD,
  NON_EXISTING_EMAIL,
  userServiceMock,
} from "../user/__mocks__/user.service";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: {} },
        { provide: UserService, useValue: userServiceMock },
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should validate existing user", () => {
    expect(
      authService.validateUser(EXISTING_EMAIL, EXISTING_PASSWORD)
    ).resolves.toEqual({ email: EXISTING_EMAIL });
  });

  it("should return null if user isn't valid", () => {
    expect(
      authService.validateUser(NON_EXISTING_EMAIL, "1234")
    ).resolves.toBeNull();
  });
});

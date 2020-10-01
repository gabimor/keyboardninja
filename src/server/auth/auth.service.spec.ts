import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User, UserSchema } from "../user/User.schema";
import { Model } from "mongoose";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { UserService } from "../user/user.service";
import { compare } from "bcrypt";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;
  const BCRYPT_SALT_ROUNDS = 10;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        AuthService,
        { provide: JwtService, useValue: {} },
        UserService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  beforeEach(async () => {
    await userModel.db.dropDatabase();
  });

  afterAll(() => {
    mongod.stop();
  });

  it("should validate existing user", async () => {
    const email = "test@email.com";
    const password = "password";
    await userService.signup(email, password);
    let user = await authService.validateUser(email, password);

    expect(user).toHaveProperty("email", email);

    user = await userService.findOne(email);

    expect(user).toHaveProperty("email", email);
    const passwordMatch = await compare(password, user.password);

    expect(passwordMatch).toBe(true);
  });

  it("should return null if email or password don't match", async () => {
    const user = await authService.validateUser("missing@email.com", "1234");

    expect(user).toBeNull();
  });
});

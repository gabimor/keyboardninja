import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User, UserSchema } from "./User.schema";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("UserService", () => {
  let userService: UserService;
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  beforeEach(async () => {
    await userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  describe("sign up", () => {
    it("should sign up a valid user", async () => {
      const user = await userService.signup("new@email.com", "password");

      expect(user).toHaveProperty("email", user.email);
    });

    it("should sign up a user and return it", async () => {
      const email = "new@email.com";
      const password = "password";

      const user = await userService.signup(email, password);

      expect(user).toHaveProperty("email", email);
    });

    it("should not find a user before sign up", async () => {
      const user = await userService.findOne("new@email.com");

      expect(user).toBeUndefined();
    });

    it("should not allow registering an existing email", async () => {
      const email = "existing@email.com";
      const password = "123456";
      await userModel.create({ email, password });

      await expect(userService.signup(email, password)).rejects.toThrow(
        "user exists"
      );
    });
  });

  describe("sign up FB", () => {
    it("should create a facebook user", async () => {
      const email = "fb@email.com";

      const user = await userService.signupFB("12345", email, "Joe", "Black");

      const foundUser = (await userModel.findOne({ _id: user._id })).toJSON();

      expect(foundUser.email).toEqual(email);
    });

    it("should augment an existing user with facebook sign up", async () => {
      const email = "regualr@email.com";
      const firstName = "Joe";

      const originalUser = await userModel.create({
        email,
        password: "password",
      });
      const fbUser = await userService.signupFB(
        "12345",
        email,
        firstName,
        "Black"
      );

      expect(originalUser._id).toBeTruthy();
      expect(originalUser._id).toEqual(fbUser._id);
      expect(fbUser.firstName).toEqual(firstName);
    });
  });
});

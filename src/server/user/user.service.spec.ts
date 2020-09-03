import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User, UserSchema } from "./User.schema";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { EXISTING_EMAIL, NEW_EMAIL, BAD_EMAIL } from "./__mocks__/user.service";
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

  beforeEach(() => {
    userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
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
    const user = await userService.signup("new@email.com", "password");

    expect(user).toHaveProperty("_id");
  });

  it("should not find a user before signup", async () => {
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

import { INestApplication } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { User, UserSchema } from "../../user/User.schema";
import { UserService } from "../../user/user.service";
import { FacebookStrategy } from "./facebook.strategy";
const mongoose = require("mongoose");

describe("facebook strategy", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let userService: UserService;
  let userModel: Model<User>;
  let facebookStrategy: FacebookStrategy;
  const mockFBUser = {
    name: { givenName: "Joe", familyName: "Black" },
    id: "facebookId",
    emails: [{ value: "fb@email.com" }],
  };

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

    facebookStrategy = new FacebookStrategy(userService, {
      clientID: "testClientID",
      clientSecret: "testClientSecret",
    });

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should augment an existing user with fb data", async () => {
    let originalUser = await userModel.create({
      email: mockFBUser.emails[0].value,
      password: "password",
    });

    let user = await userModel.findById(originalUser._id);

    expect(user.firstName).toBeUndefined();

    await facebookStrategy.validate("", "", mockFBUser, null);

    user = await userModel.findById(originalUser._id);

    expect(user.firstName).toEqual(mockFBUser.name.givenName);
  });

  it("should signup a new fb user", async () => {
    await facebookStrategy.validate("", "", mockFBUser, null);

    const user = await userModel.findOne({ facebookId: mockFBUser.id });

    expect(user.email).toEqual(mockFBUser.emails[0].value);
  });
});

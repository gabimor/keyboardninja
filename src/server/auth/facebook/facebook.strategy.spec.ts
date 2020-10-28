import { INestApplication } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { User, UserSchema } from "../../../defs/schemas/User.schema";
import { AuthService } from "../../auth/auth.service";
import { FacebookStrategy } from "./facebook.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRES_IN } from "../../../shared/consts";

describe("facebook strategy", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let authService: AuthService;
  let userModel: Model<User>;
  let facebookStrategy: FacebookStrategy;
  const mockFBUser = {
    name: { givenName: "Joe", familyName: "Black" },
    id: "facebookId",
    emails: [{ value: "fb@email.com" }],
  };
  const jwtSecret = "jwtSecret";

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        }),
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));

    facebookStrategy = new FacebookStrategy(authService, {
      clientID: "testClientID",
      clientSecret: "testClientSecret",
    });

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
    await app.close();
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

  it("should sign up a new fb user", async () => {
    await facebookStrategy.validate("", "", mockFBUser, null);

    const user = await userModel.findOne({ facebookId: mockFBUser.id });

    expect(user.email).toEqual(mockFBUser.emails[0].value);
  });
});

import { INestApplication } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { User, UserSchema } from "../../../types/schemas/User.schema";
import { AuthService } from "../../auth/auth.service";
import { GoogleStrategy } from "./google.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConsts } from "../consts";

describe("google strategy", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let authService: AuthService;
  let userModel: Model<User>;
  let googleStrategy: GoogleStrategy;
  const mockGoogleUser = {
    name: { givenName: "Joe", familyName: "Black" },
    id: "googleId",
    emails: [{ value: "google@email.com" }],
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
          signOptions: { expiresIn: jwtConsts.expiresIn },
        }),
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));

    googleStrategy = new GoogleStrategy(authService, {
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

  it("should augment an existing user with google data", async () => {
    let originalUser = await userModel.create({
      email: mockGoogleUser.emails[0].value,
      password: "password",
    });

    let user = await userModel.findById(originalUser._id).lean();

    expect(user.firstName).toBeUndefined();

    await googleStrategy.validate("", "", mockGoogleUser, null);

    user = await userModel.findById(originalUser._id).lean();

    expect(user.firstName).toEqual(mockGoogleUser.name.givenName);
  });

  it("should sign up a new google user", async () => {
    await googleStrategy.validate("", "", mockGoogleUser, null);

    const user = await userModel.findOne({ googleId: mockGoogleUser.id });

    expect(user.email).toEqual(mockGoogleUser.emails[0].value);
  });
});

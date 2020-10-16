import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { JwtModule } from "@nestjs/jwt";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { AuthService } from "../auth/auth.service";
import { JwtStrategy } from "../auth/jwt/jwt.strategy";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AppSchema, App } from "../../defs/schemas/App.schema";
import { UserApps, UserAppsSchema } from "../../defs/schemas/UserApps.schema";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { Model } from "mongoose";
import { User, UserSchema } from "../../defs/schemas/User.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "../../defs/schemas/AppCategory.schema";
import { AuthController } from "../auth/auth.controller";
import * as cookieParser from "cookie-parser";
import { GlobalExceptionFilter } from "../misc/filters/GlobalExceptionFilter";
import { ObjectId } from "mongodb";
import { jwtConsts } from "../auth/consts";

describe("app controller", () => {
  let app: INestApplication;
  const jwtSecret = "jwtSecret";
  let mongod: MongoMemoryServer;
  let appModel: Model<App>;
  let userModel: Model<User>;
  let userAppsModel: Model<UserApps>;

  const userId = new ObjectId();
  const appId = new ObjectId();
  const shortcutId = new ObjectId();

  beforeAll(async () => {
    mongod = new MongoMemoryServer();

    const uri = await mongod.getUri();

    const jwtStrategy = {
      provide: JwtStrategy,
      useFactory: () => new JwtStrategy(jwtSecret),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: App.name, schema: AppSchema },
          { name: AppCategory.name, schema: AppCategorySchema },
          { name: User.name, schema: UserSchema },
          { name: UserApps.name, schema: UserAppsSchema },
        ]),
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: jwtConsts.expiresIn },
        }),
      ],
      controllers: [AppController, AuthController],
      providers: [AuthService, AppService, jwtStrategy, JwtAuthGuard],
    }).compile();

    userAppsModel = module.get<Model<UserApps>>(getModelToken(UserApps.name));
    appModel = module.get<Model<App>>(getModelToken(App.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));

    app = module.createNestApplication();
    app.use(cookieParser());
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  beforeEach(async () => {
    await userAppsModel.db.dropDatabase();

    await appModel.create({
      _id: appId,
      name: "TestApp 1",
      icon: "icon",
      oss: [],
      sections: [],
      url: "",
      shortcuts: [{ _id: shortcutId, stars: 0 }],
    });

    await userModel.create({
      _id: userId,
      email: "email1@gmail.com",
    });
  });

  afterAll(async () => {
    await mongod.stop();
    await app.close();
  });

  it("should allow logged in user to star", async () => {
    const email = "existing@email.com";
    const password = "password";

    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password })
      .expect(HttpStatus.CREATED);

    const jwtCookie: string = res.header["set-cookie"][0];

    const regex = /(?<=jwt=)(.*?)(?=;)/;
    const jwt = jwtCookie.match(regex)[0];

    const response = await request(app.getHttpServer())
      .post("/api/star")
      .send({ appId, shortcutId })
      .set("Cookie", ["jwt=" + jwt])
      .expect(HttpStatus.CREATED);

    const { isStarred, stars } = response.body;

    expect(isStarred).toBe(true);
    expect(stars).toBe(1);
  });

  it("should not allow anonymous user to star", async () => {
    return request(app.getHttpServer())
      .post("/api/star")
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

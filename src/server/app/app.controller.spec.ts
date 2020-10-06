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
import { AppSchema, App } from "../../types/schemas/App.schema";
import {
  UserShortcut,
  UserShortcutSchema,
} from "../../types/schemas/UserShortcut.schema";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { Model } from "mongoose";
import { User, UserSchema } from "../../types/schemas/User.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "../../types/schemas/AppCategory.schema";
import { AuthController } from "../auth/auth.controller";
import * as cookieParser from "cookie-parser";
import { GlobalExceptionFilter } from "../misc/filters/GlobalExceptionFilter";

describe("app controller", () => {
  let app: INestApplication;
  const jwtSecret = "jwtSecret";
  let mongod: MongoMemoryServer;
  let appModel: Model<App>;
  let userShortcutModel: Model<UserShortcut>;
  let authService: AuthService;

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
          { name: UserShortcut.name, schema: UserShortcutSchema },
        ]),
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: "60s" },
        }),
      ],
      controllers: [AppController, AuthController],
      providers: [AuthService, AppService, jwtStrategy, JwtAuthGuard],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userShortcutModel = module.get<Model<UserShortcut>>(
      getModelToken(UserShortcut.name)
    );
    appModel = module.get<Model<App>>(getModelToken(App.name));

    app = module.createNestApplication();
    app.use(cookieParser());
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  beforeEach(async () => {
    await userShortcutModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
    await app.close();
  });

  it("should allow logged in user to star and update the stars count", async () => {
    const email = "existing@email.com";
    const password = "password";

    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password })
      .expect(HttpStatus.CREATED);

    const jwtCookie: string = res.header["set-cookie"][0];

    const regex = /(?<=jwt=)(.*?)(?=;)/;
    const jwt = jwtCookie.match(regex)[0];

    const shortcutId = "shortcutId";

    return request(app.getHttpServer())
      .post("/api/star")
      .send({ shortcutId })
      .set("Cookie", ["jwt=" + jwt])
      .expect(HttpStatus.CREATED);
  });

  it("should not allow anonymous user to star", async () => {
    return request(app.getHttpServer())
      .post("/api/star")
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it.todo("should throw if user stars an non-existing shortcut");
});

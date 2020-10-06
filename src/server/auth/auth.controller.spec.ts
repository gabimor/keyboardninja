import { AuthController } from "./auth.controller";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { User, UserSchema } from "../user/User.schema";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import * as cookieParser from "cookie-parser";

describe("Auth Controller", () => {
  let app: INestApplication;
  const jwtSecret = "jwtSecret";
  let userModel: Model<User>;
  let userService: UserService;
  let mongod: MongoMemoryServer;
  let authService: AuthService;
  let jwtService: JwtService;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: "60s" },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalAuthGuard,
        LocalStrategy,
        UserService,
        jwtStrategy,
        JwtAuthGuard,
      ],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken(User.name));
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);

    app = module.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  beforeEach(async () => {
    await userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
    await app.close();
  });

  describe("login", () => {
    it("should login existing user", async () => {
      const email = "user@email.com";
      const password = "password";

      const user = await authService.signup(email, password);

      const token = authService.generateJwt(user);
      const res = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email, password })
        .expect(HttpStatus.FOUND);

      expect(res.header["set-cookie"][0]).toContain(token);
    });
    it("should return 401 for non existing user", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "missing@user.com", password: "1231232" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it("should return 401 for an empty request", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it("should return 401 for a bad request", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ garbage: 1 })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("sign up", () => {
    it("should return 400 for existing email", () => {
      const email = "existing@email.com";
      const password = "password";

      userModel.create({ email, password });

      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email, password })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 400 for short password", () => {
      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email: "email@email.com", password: "short" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 400 for long password", () => {
      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email: "user@email.com", password: "too_long_a_password1234" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 400 for missing email", () => {
      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
    it("should return 400 for missing password", () => {
      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email: "user@email.com" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 201 for valid email and password", async () => {
      const email = "new@email.com";
      const password = "password";

      const res = await request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email, password })
        .expect(HttpStatus.CREATED);

      const cookie: string = res.header["set-cookie"][0];
      const regex = /(?<=jwt=)(.*?)(?=;)/;

      const jwt = cookie.match(regex)[0];

      const user = jwtService.decode(jwt);

      expect(user).toHaveProperty("_id");
    });
  });

  describe("logged in user", () => {
    it("should return 404 for non existing endpoint", () => {
      return request(app.getHttpServer())
        .get("/auth/login")
        .expect(HttpStatus.NOT_FOUND);
    });

    it("should not be able to access profile if not logged it", () => {
      return request(app.getHttpServer())
        .get("/auth/profile")
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it("should allow access if logged it", async () => {
      const email = "user@email.com";
      const password = "123456";

      const user = await userModel.create({ email, password });

      const token = authService.generateJwt(user);

      return request(app.getHttpServer())
        .get("/auth/profile")
        .set("Cookie", ["jwt=" + token])
        .expect(HttpStatus.OK);
    });
  });
});

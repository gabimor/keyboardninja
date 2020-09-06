import { AuthController } from "./auth.controller";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "../user/User.schema";
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";

describe("Auth Controller", () => {
  let app: INestApplication;
  const jwtSecret = "secretKey";
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;
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
    authService = module.get<AuthService>(AuthService);

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    userModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  describe("login", () => {
    it("should login existing user", async () => {
      const email = "user@email.com";
      const password = "password";

      const user = await userModel.create({ email, password });
      const token = await authService.generateJwt(user.email);

      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email, password })
        .expect(HttpStatus.CREATED)
        .expect(token);
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

  describe("signup", () => {
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
        .send({ email: "user@email.com", password: "too_long_a_password" })
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
      const email = "existing@email.com";
      const password = "password";

      const token = await authService.generateJwt(email);

      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({ email, password })
        .expect(HttpStatus.CREATED)
        .expect(token);
    });
  });

  describe("logged in", () => {
    it("should not be able to access profile if not logged it", () => {
      return request(app.getHttpServer())
        .get("/auth/profile")
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it("should allow access if logged it", async () => {
      let email = "user@email.com";
      const token = await authService.generateJwt(email);

      return request(app.getHttpServer())
        .get("/auth/profile")
        .set("Authorization", "Bearer " + token)
        .expect(HttpStatus.OK);
    });
  });
});

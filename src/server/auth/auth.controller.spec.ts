import { AuthController } from "./auth.controller";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { User, UserSchema } from "../../defs/schemas/User.schema";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import * as cookieParser from "cookie-parser";
import { GlobalExceptionFilter } from "../misc/filters/GlobalExceptionFilter";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../shared/consts";
import { CreateUserDto } from "../../defs/DTOs/createUser.dto";

describe("Auth Controller", () => {
  let app: INestApplication;
  const jwtSecret = "jwtSecret";
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;
  let authService: AuthService;
  let jwtService: JwtService;

  const createUserDto: CreateUserDto = {
    firstName: "fName",
    lastName: "lName",
    email: "test@email.com",
    password: "password",
  };

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
          secret: JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalAuthGuard,
        LocalStrategy,
        jwtStrategy,
        JwtAuthGuard,
      ],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken(User.name));
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);

    app = module.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new GlobalExceptionFilter());

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
      const user = await authService.signup(createUserDto);

      const token = authService.generateJwt(user);
      const res = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: createUserDto.email, password: createUserDto.password })
        .expect(HttpStatus.FOUND);

      expect(res.header["set-cookie"][0]).toContain(token);
    });
    it("should return 401 for non existing user", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "missing@user.com", password: "1231232" })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should return 401 for existing email and wrong password", async () => {
      await authService.signup(createUserDto);

      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: createUserDto.email, password: "wrongpass" })
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
    it("should return error for existing user", async () => {
      userModel.create(createUserDto);

      const response = await request(app.getHttpServer())
        .post("/auth/signup")
        .send(createUserDto)
        .expect(HttpStatus.ACCEPTED);

      expect(response.body.payload).toEqual("Email already taken");
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
      const res = await request(app.getHttpServer())
        .post("/auth/signup")
        .send(createUserDto)
        .expect(HttpStatus.CREATED);

      const cookie: string = res.header["set-cookie"][0];
      const regex = /(?<=jwt=)(.*?)(?=;)/;
      const jwt = cookie.match(regex)[0];

      const user = jwtService.decode(jwt);

      expect(user).toHaveProperty("email");
    });
  });
});

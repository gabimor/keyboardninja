import { AuthController } from "./auth.controller";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import {
  NON_EXISTING_EMAIL,
  userServiceMock,
} from "../user/__mocks__/user.service";
import { getModelToken } from "@nestjs/mongoose";
import { userModelMock } from "../user/__mocks__/user.schema";
import { jwtServiceMock } from "./__mocks__/jwt.service";
import { User } from "../user/User.schema";
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStrategy } from "./local.strategy";
import {
  EXISTING_EMAIL,
  EXISTING_PASSWORD,
} from "../user/__mocks__/user.service";

describe("Auth Controller", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        {
          provide: "UserService",
          useValue: userServiceMock,
        },
        LocalAuthGuard,
        LocalStrategy,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe("login", () => {
    it("should login existing user", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: EXISTING_EMAIL, password: EXISTING_PASSWORD })

        .expect(HttpStatus.CREATED);
    });

    it("should return 401 for non existing user", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: NON_EXISTING_EMAIL, password: EXISTING_PASSWORD })

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
        .send({ garbade: 1 })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("signup", () => {});
});

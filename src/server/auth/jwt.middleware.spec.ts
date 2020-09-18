import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtMiddleware } from "./jwt.middleware";

describe("jwt pipe", () => {
  const jwtSecret = "jwtSecret";
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: "60s" },
        }),
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
  });

  it("should parse data from a valid token", () => {
    const user = { a: 1 };
    const token = jwtService.sign(user);
    const req = { header: "BEARER " + token };

    const jwtMiddleware = new JwtMiddleware(jwtService);

    // expect(jwtMiddleware.transform(token, null)).toHaveProperty("a", user.a);
  });
});

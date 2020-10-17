import { Test, TestingModule } from "@nestjs/testing";
import { AuthService, SocialType } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User, UserSchema } from "../../defs/schemas/User.schema";
import { Model } from "mongoose";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { compare } from "bcrypt";
import { CreateUserDto } from "../../defs/DTOs/createUser.dto";

describe("AuthService", () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;

  const createUserDto: CreateUserDto = {
    firstName: "fName",
    lastName: "lName",
    email: "test@email.com",
    password: "password",
  };

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, { provide: JwtService, useValue: {} }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  beforeEach(async () => {
    await userModel.db.dropDatabase();
  });

  afterAll(() => {
    mongod.stop();
  });

  it("should validate existing user", async () => {
    await authService.signup(createUserDto);
    let user = await authService.validateUser(
      createUserDto.email,
      createUserDto.password
    );

    expect(user).toHaveProperty("email", createUserDto.email);

    user = await userModel.findOne({ email: createUserDto.email });

    expect(user).toHaveProperty("email", createUserDto.email);
    const passwordMatch = await compare(createUserDto.password, user.password);

    expect(passwordMatch).toBe(true);
  });

  it("should return null if email or password don't match", async () => {
    const user = await authService.validateUser("missing@email.com", "1234");

    expect(user).toBeNull();
  });

  describe("sign up", () => {
    it("should sign up a valid user", async () => {
      const user = await authService.signup(createUserDto);

      expect(user).toHaveProperty("email", user.email);
    });

    it("should sign up a user and return it", async () => {
      let user = await authService.signup(createUserDto);

      expect(user).toHaveProperty("email", createUserDto.email);

      user = await userModel.findOne({ email: createUserDto.email });

      expect(user).toHaveProperty("email", createUserDto.email);
      const passwordMatch = await compare(
        createUserDto.password,
        user.password
      );

      expect(passwordMatch).toBe(true);
    });

    it("should not find a user before sign up", async () => {
      const email = "new@email.com";
      const user = await userModel.findOne({ email }).lean();

      expect(user).toBeNull();
    });

    it("should not allow registering an existing email", async () => {
      await userModel.create(createUserDto);

      await expect(authService.signup(createUserDto)).rejects.toThrow(
        "Email already taken"
      );
    });
  });

  describe("sign up FB", () => {
    it("should create a facebook user", async () => {
      const email = "fb@email.com";

      const user = await authService.signupSocial(
        "12345",
        SocialType.Facebook,
        email,
        "Joe",
        "Black"
      );

      const foundUser = (await userModel.findOne({ _id: user._id })).toJSON();

      expect(foundUser.email).toEqual(email);
    });

    it("should augment an existing user with facebook sign up", async () => {
      const originalUser = await userModel.create(createUserDto);
      const fbUser = await authService.signupSocial(
        "12345",
        SocialType.Facebook,
        createUserDto.email,
        createUserDto.firstName,
        createUserDto.lastName
      );

      expect(originalUser._id).toBeTruthy();
      expect(originalUser._id).toEqual(fbUser._id);
      expect(fbUser.firstName).toEqual(createUserDto.firstName);
    });
  });
});

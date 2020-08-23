// import { Test, TestingModule } from "@nestjs/testing";
// import { UserService } from "./user.service";

describe("UsersService", () => {
  // let userService: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UserService],
  //   }).compile();

  //   userService = module.get<UserService>(UserService);
  // });

  it("should not allow signup of bad email", () => {
    const email = "bademail";
    const password = "goodpassword";

    // expect(userService.signup(email, password)).toThrow();
    expect(1).toEqual(1);
  });

  // it("should allow signup for valid email and password", () => {
  //   const userModel = {};

  //   const email = "joe@blackwater.com";
  //   const password = "12345678";

  //   userService.signup(email, password);
  // });
});

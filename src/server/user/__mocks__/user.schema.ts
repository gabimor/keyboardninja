import {
  EXISTING_EMAIL,
  EXISTING_PASSWORD,
  NEW_EMAIL,
  NON_EXISTING_EMAIL,
} from "./user.service";

export const userModelMock = {
  findOne: jest.fn(({ email }) => {
    if (email === EXISTING_EMAIL) return { email, password: EXISTING_PASSWORD };
    else if (email === NON_EXISTING_EMAIL) return;
    else if (email === NEW_EMAIL) return;
    else {
      throw new Error("wrong email passed to mockUserModel.findOne:" + email);
    }
  }),
  create: jest.fn().mockResolvedValue(true),
};

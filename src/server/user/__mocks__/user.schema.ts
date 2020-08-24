export const EXISTING_EMAIL = "existing@email.com";

export const userModelMock = {
  findOne: jest.fn(({ email }) => {
    if (email === EXISTING_EMAIL) return { email };
  }),
  create: jest.fn().mockResolvedValue(true),
};

export const EXISTING_EMAIL = "existing@email.com";
export const NON_EXISTING_EMAIL = "nonexisting@email.com";
export const NEW_EMAIL = "new@email.com";
export const BAD_EMAIL = "bademail";
export const EXISTING_PASSWORD = "12345678";

export const userServiceMock = {
  findOne: jest.fn((email) => {
    let user = undefined;
    if (email === EXISTING_EMAIL) user = { email, password: EXISTING_PASSWORD };
    else if (email === NON_EXISTING_EMAIL) user = undefined;
    else if (email === NEW_EMAIL) user = undefined;
    else {
      throw new Error("wrong email passed to userServiceMock.findOne:" + email);
    }

    return Promise.resolve(user);
  }),
};

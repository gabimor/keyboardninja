export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  facebookId?: string;
  googleId?: string;
};

export type JwtUser = Partial<
  Pick<
    UserType,
    "_id" | "email" | "firstName" | "lastName" | "facebookId" | "googleId"
  >
>;

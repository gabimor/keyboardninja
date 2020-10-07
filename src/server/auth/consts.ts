export const jwtConsts = { secret: process.env.JWT_SECRET, expiresIn: "3000d" };
export const bcryptSaltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
export const SENTRY_TRACE_SAMPLE_RATE: number = parseFloat(
  process.env.SENTRY_TRACE_SAMPLE_RATE
);
export const SENTRY_FRONT_END_DSN = process.env.SENTRY_FRONT_END_DSN
export const SENTRY_BACK_END_DSN = process.env.SENTRY_BACK_END_DSN
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
export const FB_APP_ID = process.env.FB_APP_ID
export const FB_APP_SECRET = process.env.FB_APP_SECRET
export const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID
export const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET
export const APP_URL = process.env.APP_URL

// JWT
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

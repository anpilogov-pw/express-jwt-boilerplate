import * as process from 'process';

export const CONFIG = {
  expiresAccessTokenIn: '24h',
  expiresAccessTokenInMsec: 24 * 60 * 60 * 1000,
  expiresRefreshTokenIn: '30d',
  expiresRefreshTokenInMsec: 30 * 24 * 60 * 60 * 1000,
  ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASS: process.env.REDIS_PASS,
};
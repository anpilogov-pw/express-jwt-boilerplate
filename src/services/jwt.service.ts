import jwt from 'jsonwebtoken';
import { CONFIG } from '../constants';
import { TCredentials } from '../types/CredentialsType';

export class JwtService {
  getCredentials(userId: number, email: string) {
    let credentials: TCredentials = {};

    const payload = {
      user_id: userId,
      email: email,
    };

    credentials.access_token = jwt.sign(payload, CONFIG.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: CONFIG.expiresAccessTokenIn,
    });

    credentials.expires_in = CONFIG.expiresAccessTokenInMsec;

    credentials.refresh_token = jwt.sign(payload, CONFIG.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: CONFIG.expiresRefreshTokenIn,
    });

    credentials.refresh_token_expires_in = CONFIG.expiresRefreshTokenInMsec;

    return credentials;
  }
}

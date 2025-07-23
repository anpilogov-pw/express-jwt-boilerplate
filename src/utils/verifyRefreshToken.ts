import jwt, { JwtPayload } from 'jsonwebtoken';
import { CONFIG } from '../constants';

type TokenDetails = {
  user_id: string;
  email: string;
};

export const verifyRefreshToken = (refreshToken: string): Promise<{ tokenDetails: TokenDetails }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, CONFIG.REFRESH_TOKEN_PRIVATE_KEY, (error, decoded) => {
      if (error || !decoded || typeof decoded === 'string') {
        return reject({
          result: null,
          error: {
            code: 'invalid_refresh_token',
            msg: 'Invalid refresh token',
          },
        });
      }
      const { user_id, email } = decoded as JwtPayload;
      resolve({ tokenDetails: { user_id, email } });
    });
  });
};

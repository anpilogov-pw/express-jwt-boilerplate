import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CONFIG } from '../constants';
import { ICustomRequest } from '../interfaces';

const { ACCESS_TOKEN_PRIVATE_KEY } = CONFIG;

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded: string | JwtPayload = jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY);
    //@ts-ignore
    (req as ICustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

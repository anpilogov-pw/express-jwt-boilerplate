import { Request } from 'express';

interface IReqToken {
  user_id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface ICustomRequest extends Request {
  token: IReqToken;
}

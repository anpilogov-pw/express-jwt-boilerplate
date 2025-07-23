import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService, UserService } from '../services';
import { CONFIG, STATUS_CODE } from '../constants';
import { verifyRefreshToken } from '../utils';

class AuthController {
  public jwtService: JwtService;
  public userService: UserService;

  constructor() {
    this.jwtService = new JwtService();
    this.userService = new UserService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const errorResponse: {} = {
        result: null,
        error: {
          code: 'invalid_credentials',
          msg: 'Invalid Credentials',
        },
      };

      const user: any = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(STATUS_CODE.ERROR).json(errorResponse);
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(STATUS_CODE.ERROR).json(errorResponse);
      }

      const credentials = this.jwtService.getCredentials(user.id, email);

      return res.status(STATUS_CODE.OK).json({
        result: {
          data: {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            ...credentials,
          },
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error');
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, lastname, email, password } = req.body;

      const errorResponse: {} = {
        result: null,
        error: {
          code: 'register_error',
          msg: 'Register error',
        },
      };

      const foundUser = await this.userService.findByEmail(email);
      if (foundUser) {
        return res.status(STATUS_CODE.ERROR).json(errorResponse);
      }

      const user: any = await this.userService.create({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      });

      if (!user) {
        return res.status(STATUS_CODE.ERROR).json(errorResponse);
      }

      res.status(STATUS_CODE.OK).json({ result: { status: true }, error: null });
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error');
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      verifyRefreshToken(refreshToken)
        .then(({ tokenDetails }) => {
          const payload = {
            user_id: tokenDetails.user_id,
            email: tokenDetails.email,
          };
          const accessToken = jwt.sign(payload, CONFIG.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: CONFIG.expiresAccessTokenIn,
          });
          res.status(STATUS_CODE.OK).json({
            result: {
              access_token: accessToken,
              expires_in: CONFIG.expiresAccessTokenInMsec,
              msg: 'Access token created successfully',
            },
            error: null,
          });
        })
        .catch((error: any) => res.status(STATUS_CODE.ERROR).json(error));
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error');
    }
  }
}

export default AuthController;

import { Router } from 'express';
import { RATE_LIMITES } from '../constants';
import { rateLimiter } from '../middleware';
import AuthController from '../controllers/auth.controller';

const router: Router = Router();
const authController = new AuthController();

router.post('/login', [rateLimiter(RATE_LIMITES.LOGIN)], authController.login.bind(authController));
router.post('/register', [rateLimiter(RATE_LIMITES.REGISTER)], authController.register.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

export const AuthRoutes: Router = router;

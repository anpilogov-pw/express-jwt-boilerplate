import { Router } from 'express';
import { AuthRoutes } from './routes';

const router: Router = Router();

router.use('/', AuthRoutes);

export default router;
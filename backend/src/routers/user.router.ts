import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware.checkAccessToken, userController.getMe);
router.get('/me/rooms', authMiddleware.checkAccessToken, userController.getMyRoom);

export const userRouter = router;

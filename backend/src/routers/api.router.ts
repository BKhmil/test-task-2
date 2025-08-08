import { Router } from 'express';

import { authRouter } from './auth.router';
import { roomsRouter } from './rooms.router';
import { userRouter } from './user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/rooms', roomsRouter);

export const apiRouter = router;

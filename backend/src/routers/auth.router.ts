import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { commonMiddleware } from '../middlewares/common.middleware';
import { UserValidator } from '../validators/user.validator';

const router = Router();

router.head('/ping', (req, res) => {
	res.sendStatus(204);
});

router.post(
	'/sign-up',
	commonMiddleware.validateBody(UserValidator.signUp),
	authMiddleware.checkEmail(true),
	authController.signUp,
);

router.post(
	'/sign-in',
	commonMiddleware.validateBody(UserValidator.signIn),
	authMiddleware.checkEmail(),
	authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post(
  "/logout-all",
  authMiddleware.checkAccessToken,
  authController.logoutAll
);

export const authRouter = router;

import { NextFunction, Request, Response } from 'express';

import { ITokenPayload } from '../interfaces/token.interface';
import { userService } from '../services/user.service';

class UserController {
	public async getMe(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const result = await userService.getMe(tokenPayload.userId);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async getMyRoom(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const result = await userService.getMyRoom(tokenPayload.userId);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
}

export const userController = new UserController();

import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors/api.error';
import { ITokenPayload } from '../interfaces/token.interface';
import {
	ISignInRequestDto,
	ISignUpRequestDto,
} from '../interfaces/user.interface';
import { authService } from '../services/auth.service';

class AuthController {
	public async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = req.body as ISignUpRequestDto;
			const result = await authService.signUp(dto);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const isDeleted = req.res.locals.isDeleted as boolean;

			if (isDeleted) {
				throw new ApiError('User not found', 404);
			} else {
				const dto = req.body as ISignInRequestDto;
				const result = await authService.signIn(dto);
				res.status(201).json(result);
			}
		} catch (err) {
			next(err);
		}
	}

	public async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const refreshToken = req.res.locals.refreshToken as string;
			const result = await authService.refresh(tokenPayload, refreshToken);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async logout(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const accessToken = req.res.locals.accessToken as string;
			await authService.logout(accessToken, tokenPayload);
			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}

	public async logoutAll(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			await authService.logoutAll(tokenPayload);
			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}
}

export const authController = new AuthController();

import { NextFunction, Request, Response } from 'express';

import { TokenTypeEnum } from '../enums/token-type.enum';
import { ApiError } from '../errors/api.error';
import {
	ISignInRequestDto,
	ISignUpRequestDto,
} from '../interfaces/user.interface';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { tokenService } from '../services/token.service';

class AuthMiddleware {
	public async checkAccessToken(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const header = req.headers.authorization;
			if (!header) {
				throw new ApiError('No authorization header', 401);
			}
			const accessToken = header.split('Bearer ')[1];
			if (!accessToken) {
				throw new ApiError('Invalid auth format', 401);
			}
			const tokenPayload = tokenService.verifyToken(
				accessToken,
				TokenTypeEnum.ACCESS,
			);

			const pair = await tokenRepository.findByParams({ accessToken });
			if (!pair) {
				throw new ApiError('Invalid token', 401);
			}
			req.res.locals.tokenPayload = tokenPayload;
			req.res.locals.accessToken = accessToken;
			next();
		} catch (err) {
			next(err);
		}
	}

	public async checkRefreshToken(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const header = req.headers.authorization;
			if (!header) {
				throw new ApiError('No authorization header', 401);
			}
			const refreshToken = header.split('Bearer ')[1];
			if (!refreshToken) {
				throw new ApiError('Invalid auth format', 401);
			}
			const tokenPayload = tokenService.verifyToken(
				refreshToken,
				TokenTypeEnum.REFRESH,
			);

			const pair = await tokenRepository.findByParams({ refreshToken });
			if (!pair) {
				throw new ApiError('Invalid token', 401);
			}
			req.res.locals.tokenPayload = tokenPayload;
			req.res.locals.refreshToken = refreshToken;
			next();
		} catch (err) {
			next(err);
		}
	}

	public checkEmail(isSafe: boolean = false) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const dto = req.body as ISignUpRequestDto | ISignInRequestDto;
				const user = await userRepository.getByEmail(dto.email);

				if (user && isSafe) {
					throw new ApiError('Email already in use', 400);
				}

				if (!user && !isSafe) {
					throw new ApiError('Invalid credentials', 401);
				}
				next();
			} catch (err) {
				next(err);
			}
		};
	}
}

export const authMiddleware = new AuthMiddleware();

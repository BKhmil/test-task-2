import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

import { ApiError } from '../errors/api.error';

class CommonMiddleware {
	public isIdValid(key: string) {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				const id = req.params[key];
				const idNumber = Number(id);
				if (!Number.isInteger(idNumber) || idNumber <= 0) {
					throw new ApiError('Invalid id', 400);
				}
				next();
			} catch (err) {
				next(err);
			}
		};
	}

	public validateBody(validator: ObjectSchema) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				if (!req.body || !Object.keys(req.body).length) {
					throw new ApiError('Empty body', 400);
				}

				req.body = await validator.validateAsync(req.body);
				next();
			} catch (err) {
				if (err.isJoi) {
					next(new ApiError(err.details[0].message, 400));
				} else {
					next(err);
				}
			}
		};
	}

	public validateQuery(validator: ObjectSchema) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const value = await validator.validateAsync(req.query);
				Object.assign(req.query, value);
				next();
			} catch (err) {
				if (err.isJoi) {
					next(new ApiError(err.details[0].message, 400));
				} else {
					next(err);
				}
			}
		};
	}
}

export const commonMiddleware = new CommonMiddleware();

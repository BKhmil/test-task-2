import { NextFunction, Request, Response } from 'express';
import { ICreateRoomDto, IRoomListQuery } from '../interfaces/room.interface';
import { ITokenPayload } from '../interfaces/token.interface';
import { roomsService } from '../services/rooms.service';

class RoomsController {
	public async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const query = req.query as unknown as IRoomListQuery;
			const result = await roomsService.getList(query, tokenPayload.userId);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const result = await roomsService.getById(
				Number(req.params.id),
				tokenPayload.userId,
			);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async getRoomUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const roomId = Number(req.params.roomId);

			const participants = await roomsService.getRoomUsers(
				roomId,
				tokenPayload.userId,
			);
			res.status(200).json({ participants });
		} catch (err) {
			next(err);
		}
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const dto = req.body as ICreateRoomDto;
			const result = await roomsService.create(dto, tokenPayload.userId);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const result = await roomsService.update(
				Number(req.params.id),
				req.body,
				tokenPayload.userId,
			);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			await roomsService.delete(Number(req.params.id), tokenPayload.userId);
			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}

	public async addUserToRoom(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const { email, role } = req.body;

			if (!email || !role) {
				return res.status(400).json({ message: 'Email and role are required' });
			}

			await roomsService.addUserToRoom(
				Number(req.params.roomId),
				email,
				role,
				tokenPayload.userId,
			);
			res.status(200).json({ message: 'User added to room successfully' });
		} catch (err) {
			next(err);
		}
	}

	public async removeUserFromRoom(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			await roomsService.removeUserFromRoom(
				Number(req.params.roomId),
				Number(req.params.userId),
				tokenPayload.userId,
			);
			res.status(200).json({ message: 'User removed from room successfully' });
		} catch (err) {
			next(err);
		}
	}

	public async getSharedRooms(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const query = req.query as unknown as IRoomListQuery;
			const result = await roomsService.getSharedRooms(
				query,
				tokenPayload.userId,
			);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	public async getRoomPermissions(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
			const roomId = Number(req.params.roomId);

			const permissions = await roomsService.getUserRoomPermissions(
				roomId,
				tokenPayload.userId,
			);
			res.status(200).json(permissions);
		} catch (err) {
			next(err);
		}
	}
}

export const roomsController = new RoomsController();

import { Op } from 'sequelize';
import {
	ICreateRoomDto,
	IRoom,
	IRoomList,
	IRoomListQuery,
	IUpdateRoomDto,
} from '../interfaces/room.interface';
import { Room, RoomUser, User } from '../models';

class RoomRepository {
	async getWithPagination(query: IRoomListQuery): Promise<IRoomList> {
		const { page = 1, limit = 10 } = query;
		const { pageNumber, limitNumber, offset } = this.calculatePagination(
			page,
			limit,
		);

		const { count, rows } = await Room.findAndCountAll({
			include: [
				{
					model: User,
					as: 'creator',
					attributes: ['id', 'name', 'email'],
				},
			],
			limit: limitNumber,
			offset,
			order: [['id', 'DESC']],
		});

		return {
			rooms: rows,
			total: count,
			page: pageNumber,
			limit: limitNumber,
		};
	}

	async create(roomData: ICreateRoomDto, userId: number): Promise<IRoom> {
		return await Room.create({ ...roomData, createdBy: userId });
	}

	async getById(id: number): Promise<IRoom | null> {
		return await Room.findByPk(id, {
			include: [
				{
					model: User,
					as: 'creator',
					attributes: ['id', 'name', 'email'],
				},
				{
					model: User,
					as: 'users',
					attributes: ['id', 'name', 'email'],
					through: { attributes: ['role'] },
				},
			],
		});
	}

	async update(id: number, updateData: IUpdateRoomDto): Promise<IRoom | null> {
		const room = await Room.findByPk(id);
		if (!room) return null;

		return await room.update(updateData);
	}

	async delete(id: number): Promise<void> {
		await Room.destroy({ where: { id } });
	}

	async addUserToRoom(
		roomId: number,
		userId: number,
		role: string,
	): Promise<void> {
		const room = await this.findRoomByIdOrThrow(roomId);
		await (room as any).$add('users', userId, { through: { role } });
	}

	async removeUserFromRoom(roomId: number, userId: number): Promise<void> {
		const room = await this.findRoomByIdOrThrow(roomId);
		await (room as any).$remove('users', userId);
	}

	async checkUserAccess(roomId: number, userId: number): Promise<boolean> {
		const room = await Room.findByPk(roomId);
		if (!room) return false;

		const users = await (room as any).$get('users', {
			where: { id: userId },
		});

		return users && users.length > 0;
	}

	async checkUserIsAdmin(roomId: number, userId: number): Promise<boolean> {
		const room = await Room.findByPk(roomId);
		if (!room) return false;

		const users = await (room as any).$get('users', {
			where: { id: userId },
			through: { where: { role: 'admin' } },
		});

		return users && users.length > 0;
	}

	async getUserRooms(userId: number): Promise<IRoom[]> {
		const user = await User.findByPk(userId, {
			include: [
				{
					model: Room,
					as: 'rooms',
					attributes: ['id', 'name', 'description'],
				},
			],
		});

		return (user as any)?.rooms || [];
	}

	async getUserAccessibleRooms(
		query: IRoomListQuery,
		userId: number,
	): Promise<IRoomList> {
		const { page = 1, limit = 10 } = query;
		const { pageNumber, limitNumber, offset } = this.calculatePagination(
			page,
			limit,
		);

		const { count, rows } = await Room.findAndCountAll({
			include: [
				{
					model: User,
					as: 'creator',
					attributes: ['id', 'name', 'email'],
				},
				{
					model: User,
					as: 'users',
					where: { id: userId },
					attributes: [],
					through: { attributes: ['role'] },
				},
			],
			where: {
				'$users.id$': userId,
			},
			limit: limitNumber,
			offset,
			order: [['id', 'DESC']],
		});

		return {
			rooms: rows,
			total: count,
			page: pageNumber,
			limit: limitNumber,
		};
	}

	async getUserOwnedRooms(userId: number): Promise<IRoom[]> {
		return await Room.findAll({
			where: { createdBy: userId },
			attributes: ['id', 'name', 'description', 'createdBy'],
		});
	}

	async getUserSharedRooms(
		query: IRoomListQuery,
		userId: number,
	): Promise<IRoomList> {
		const { page = 1, limit = 10 } = query;
		const { pageNumber, limitNumber, offset } = this.calculatePagination(
			page,
			limit,
		);

		const roomUsers = await RoomUser.findAll({
			where: { userId },
			include: [
				{
					model: Room,
					as: 'room',
					where: { createdBy: { [Op.ne]: userId } },
				},
			],
		});

		const roomIds = roomUsers.map((ru: any) => ru.roomId);

		if (roomIds.length === 0) {
			return {
				rooms: [],
				total: 0,
				page: pageNumber,
				limit: limitNumber,
			};
		}

		const rooms = await Room.findAll({
			where: {
				id: { [Op.in]: roomIds },
				createdBy: { [Op.ne]: userId },
			},
			include: [
				{
					model: User,
					as: 'creator',
					attributes: ['id', 'name', 'email'],
				},
			],
			limit: limitNumber,
			offset,
			order: [['id', 'DESC']],
		});

		const total = await Room.count({
			where: {
				id: { [Op.in]: roomIds },
				createdBy: { [Op.ne]: userId },
			},
		});

		return {
			rooms,
			total,
			page: pageNumber,
			limit: limitNumber,
		};
	}

	private calculatePagination(page: number, limit: number) {
		const pageNumber = Number(page);
		const limitNumber = Number(limit);
		const offset = (pageNumber - 1) * limitNumber;

		return { pageNumber, limitNumber, offset };
	}

	private async findRoomByIdOrThrow(roomId: number) {
		const room = await Room.findByPk(roomId);
		if (!room) throw new Error('Room not found');
		return room;
	}
}

export const roomRepository = new RoomRepository();

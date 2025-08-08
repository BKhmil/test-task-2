import {
	ICreateRoomUserDto,
	IUpdateRoomUserDto,
} from '../interfaces/room-user.interface';
import { RoomUser } from '../models/room-user.model';
import { User } from '../models/user.model';

class RoomUsersRepository {
	public async findByRoomId(roomId: number): Promise<any[]> {
		return await RoomUser.findAll({
			where: { roomId },
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'email'],
				},
			],
		});
	}

	public async findByUserId(userId: number): Promise<any[]> {
		return await RoomUser.findAll({
			where: { userId },
		});
	}

	public async findByRoomAndUser(
		roomId: number,
		userId: number,
	): Promise<any | null> {
		return await RoomUser.findOne({
			where: { roomId, userId },
		});
	}

	public async create(data: ICreateRoomUserDto): Promise<any> {
		return await RoomUser.create(data);
	}

	public async update(id: number, data: IUpdateRoomUserDto): Promise<any> {
		const roomUser = await RoomUser.findByPk(id);
		if (!roomUser) {
			throw new Error('Room user not found');
		}
		return await roomUser.update(data);
	}

	public async delete(id: number): Promise<void> {
		const roomUser = await RoomUser.findByPk(id);
		if (!roomUser) {
			throw new Error('Room user not found');
		}
		await roomUser.destroy();
	}

	public async deleteByRoomAndUser(
		roomId: number,
		userId: number,
	): Promise<void> {
		const roomUser = await RoomUser.findOne({
			where: { roomId, userId },
		});
		if (roomUser) {
			await roomUser.destroy();
		}
	}
}

export const roomUsersRepository = new RoomUsersRepository();

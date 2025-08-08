import { ERoomUserRole } from '../enums/room-user-role.enum';
import { ApiError } from '../errors/api.error';
import type {
	IAddUserToRoomDto,
	ICreateRoomUserDto,
	IRemoveUserFromRoomDto,
	IRoomUser,
	IUpdateRoomUserDto,
	IUpdateUserRoleDto,
} from '../interfaces/room-user.interface';
import { roomUsersRepository } from '../repositories/room-users.repository';
import { roomRepository } from '../repositories/room.repository';
import { userRepository } from '../repositories/user.repository';

export class RoomUsersService {
	public static async create(data: ICreateRoomUserDto): Promise<IRoomUser> {
		const existingRoomUser = await this.findRoomUserByRoomAndUser(
			data.roomId,
			data.userId,
		);

		if (existingRoomUser) {
			throw new ApiError('User is already added to this room', 400);
		}

		return await roomUsersRepository.create(data);
	}

	public static async findByRoomId(roomId: number): Promise<IRoomUser[]> {
		return await roomUsersRepository.findByRoomId(roomId);
	}

	public static async findByUserId(userId: number): Promise<IRoomUser[]> {
		return await roomUsersRepository.findByUserId(userId);
	}

	public static async findByRoomAndUser(
		roomId: number,
		userId: number,
	): Promise<IRoomUser | null> {
		return await roomUsersRepository.findByRoomAndUser(roomId, userId);
	}

	public static async update(
		id: number,
		data: IUpdateRoomUserDto,
	): Promise<IRoomUser> {
		return await roomUsersRepository.update(id, data);
	}

	public static async delete(id: number): Promise<void> {
		await roomUsersRepository.delete(id);
	}

	public static async addUserToRoom(
		data: IAddUserToRoomDto,
	): Promise<IRoomUser> {
		const user = await this.findUserByEmailOrThrow(data.userEmail);
		await this.findRoomByIdOrThrow(data.roomId);

		const existingRoomUser = await this.findRoomUserByRoomAndUser(
			data.roomId,
			user.id,
		);

		if (existingRoomUser) {
			throw new ApiError('User is already added to this room', 400);
		}

		return await roomUsersRepository.create({
			roomId: data.roomId,
			userId: user.id,
			role: data.role,
		});
	}

	public static async removeUserFromRoom(
		data: IRemoveUserFromRoomDto,
	): Promise<void> {
		const roomUser = await this.findRoomUserByRoomAndUserOrThrow(
			data.roomId,
			data.userId,
		);

		await roomUsersRepository.delete(roomUser.id);
	}

	public static async updateUserRole(
		data: IUpdateUserRoleDto,
	): Promise<IRoomUser> {
		const roomUser = await this.findRoomUserByRoomAndUserOrThrow(
			data.roomId,
			data.userId,
		);

		return await roomUsersRepository.update(roomUser.id, { role: data.role });
	}

	public static async checkUserRole(
		roomId: number,
		userId: number,
		requiredRole: ERoomUserRole,
	): Promise<boolean> {
		const roomUser = await this.findRoomUserByRoomAndUser(roomId, userId);

		if (!roomUser) {
			return false;
		}

		if (requiredRole === ERoomUserRole.ADMIN) {
			return roomUser.role === ERoomUserRole.ADMIN;
		}

		return true;
	}

	public static async checkUserHasAccess(
		roomId: number,
		userId: number,
	): Promise<boolean> {
		const roomUser = await this.findRoomUserByRoomAndUser(roomId, userId);
		return !!roomUser;
	}

	private static async findRoomUserByRoomAndUser(
		roomId: number,
		userId: number,
	): Promise<IRoomUser | null> {
		return await roomUsersRepository.findByRoomAndUser(roomId, userId);
	}

	private static async findRoomUserByRoomAndUserOrThrow(
		roomId: number,
		userId: number,
	): Promise<IRoomUser> {
		const roomUser = await this.findRoomUserByRoomAndUser(roomId, userId);

		if (!roomUser) {
			throw new ApiError('User is not added to this room', 404);
		}

		return roomUser;
	}

	private static async findUserByEmailOrThrow(email: string) {
		const user = await userRepository.getByEmail(email);

		if (!user) {
			throw new ApiError('User not found', 404);
		}

		return user;
	}

	private static async findRoomByIdOrThrow(roomId: number) {
		const room = await roomRepository.getById(roomId);

		if (!room) {
			throw new ApiError('Room not found', 404);
		}

		return room;
	}
}

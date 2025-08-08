import { ERoomUserRole } from '../enums/room-user-role.enum';
import { ApiError } from '../errors/api.error';
import {
	ICreateRoomDto,
	IRoomListQuery,
	IRoomResponseDto,
	IUpdateRoomDto,
} from '../interfaces/room.interface';
import { roomPresenter } from '../presenters/room.presenter';
import { roomRepository } from '../repositories/room.repository';
import { RoomUsersService } from './room-users.service';

class RoomsService {
	public async getList(
		query: IRoomListQuery,
		userId: number,
	): Promise<{
		rooms: IRoomResponseDto[];
		total: number;
		page: number;
		limit: number;
	}> {
		const rooms = await roomRepository.getUserAccessibleRooms(query, userId);
		return {
			rooms: rooms.rooms.map((room) => roomPresenter.toResponse(room)),
			total: rooms.total,
			page: rooms.page,
			limit: rooms.limit,
		};
	}

	public async getById(
		roomId: number,
		userId: number,
	): Promise<IRoomResponseDto> {
		const room = await this.roomExistsOrThrow(roomId);
		await this.checkUserHasAccessOrThrow(roomId, userId);
		return roomPresenter.toResponse(room);
	}

	public async create(
		dto: ICreateRoomDto,
		userId: number,
	): Promise<IRoomResponseDto> {
		const existingRooms = await roomRepository.getUserOwnedRooms(userId);
		if (existingRooms.length > 0) {
			throw new ApiError(
				'You can only create one room. Please delete your existing room first.',
				400,
			);
		}

		const room = await roomRepository.create(dto, userId);

		await RoomUsersService.create({
			roomId: room.id,
			userId: userId,
			role: ERoomUserRole.ADMIN,
		});

		return roomPresenter.toResponse(room);
	}

	public async update(
		roomId: number,
		dto: IUpdateRoomDto,
		userId: number,
	): Promise<IRoomResponseDto> {
		await this.checkRoomAccessOrThrow(roomId, userId);
		const updatedRoom = await roomRepository.update(roomId, dto);
		return roomPresenter.toResponse(updatedRoom);
	}

	public async delete(roomId: number, userId: number): Promise<void> {
		await this.checkRoomAccessOrThrow(roomId, userId);
		await roomRepository.delete(roomId);
	}

	public async addUserToRoom(
		roomId: number,
		userEmail: string,
		role: ERoomUserRole,
		adminUserId: number,
	): Promise<void> {
		await this.checkUserIsAdminOrThrow(roomId, adminUserId);

		await RoomUsersService.addUserToRoom({
			roomId,
			userEmail,
			role,
		});
	}

	public async removeUserFromRoom(
		roomId: number,
		userId: number,
		adminUserId: number,
	): Promise<void> {
		await this.checkUserIsAdminOrThrow(roomId, adminUserId);

		const room = await this.roomExistsOrThrow(roomId);

		if (room.createdBy === userId) {
			throw new ApiError('Cannot remove room owner from the room', 400);
		}

		await RoomUsersService.removeUserFromRoom({
			roomId,
			userId,
		});
	}

	public async checkUserHasAccessOrThrow(
		roomId: number,
		userId: number,
	): Promise<void> {
		const hasAccess = await RoomUsersService.checkUserHasAccess(roomId, userId);
		if (!hasAccess) {
			throw new ApiError('Access denied', 403);
		}
	}

	public async getRoomUsers(roomId: number, userId: number): Promise<any[]> {
		await this.checkUserHasAccessOrThrow(roomId, userId);

		const roomUsers = await RoomUsersService.findByRoomId(roomId);
		return roomUsers.map((roomUser: any) => ({
			userId: roomUser.userId,
			userName: roomUser.user?.name || 'Unknown User',
			userEmail: roomUser.user?.email || 'unknown@example.com',
			role: roomUser.role,
		}));
	}

	public async getSharedRooms(
		query: IRoomListQuery,
		userId: number,
	): Promise<{
		rooms: IRoomResponseDto[];
		total: number;
		page: number;
		limit: number;
	}> {
		const rooms = await roomRepository.getUserSharedRooms(query, userId);
		return {
			rooms: rooms.rooms.map((room) => roomPresenter.toResponse(room)),
			total: rooms.total,
			page: rooms.page,
			limit: rooms.limit,
		};
	}

	public async getUserRoomPermissions(
		roomId: number,
		userId: number,
	): Promise<{
		isOwner: boolean;
		isAdmin: boolean;
		canAddUsers: boolean;
		canRemoveUsers: boolean;
	}> {
		const room = await this.roomExistsOrThrow(roomId);

		const isOwner = room.createdBy === userId;
		const roomUser = await RoomUsersService.findByRoomAndUser(roomId, userId);
		const isAdmin = roomUser?.role === ERoomUserRole.ADMIN;

		return {
			isOwner,
			isAdmin,
			canAddUsers: isOwner || isAdmin,
			canRemoveUsers: isOwner || isAdmin,
		};
	}

	private async roomExistsOrThrow(roomId: number) {
		const room = await roomRepository.getById(roomId);
		if (!room) throw new ApiError('Room not found', 404);
		return room;
	}

	private async checkRoomAccessOrThrow(
		roomId: number,
		userId: number,
	): Promise<void> {
		await this.roomExistsOrThrow(roomId);
		await this.checkUserIsAdminOrThrow(roomId, userId);
	}

	private async checkUserIsAdminOrThrow(
		roomId: number,
		userId: number,
	): Promise<void> {
		const isAdmin = await RoomUsersService.checkUserRole(
			roomId,
			userId,
			ERoomUserRole.ADMIN,
		);
		if (!isAdmin) {
			throw new ApiError('Access denied', 403);
		}
	}
}

export const roomsService = new RoomsService();

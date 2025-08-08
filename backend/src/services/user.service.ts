import { ApiError } from '../errors/api.error';
import { IRoomResponseDto } from '../interfaces/room.interface';
import { IUserResponseDto } from '../interfaces/user.interface';
import { roomPresenter } from '../presenters/room.presenter';
import { userPresenter } from '../presenters/user.presenter';
import { roomRepository } from '../repositories/room.repository';
import { userRepository } from '../repositories/user.repository';

class UserService {
	public async getMe(userId: number): Promise<IUserResponseDto> {
		const user = await this.findUserByIdOrThrow(userId);
		return userPresenter.toResponse(user);
	}

	public async getMyRoom(userId: number): Promise<IRoomResponseDto | null> {
		const rooms = await roomRepository.getUserOwnedRooms(userId);
		if (rooms.length === 0) {
			return null;
		}
		return roomPresenter.toResponse(rooms[0]);
	}

	private async findUserByIdOrThrow(userId: number) {
		const user = await userRepository.getById(userId);
		if (!user) throw new ApiError('User not found', 404);
		return user;
	}
}

export const userService = new UserService();

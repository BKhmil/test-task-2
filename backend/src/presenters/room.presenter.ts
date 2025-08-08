import {
	IRoom,
	IRoomList,
	IRoomListResponseDto,
	IRoomResponseDto,
} from '../interfaces/room.interface';

class RoomPresenter {
	public toResponse(entity: IRoom): IRoomResponseDto {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			createdBy: entity.createdBy,
			roomUsers: (entity as any).roomUsers || [],
		};
	}

	public toListResponse(entity: IRoomList): IRoomListResponseDto {
		return {
			rooms: entity.rooms.map((room) => this.toResponse(room)),
			total: entity.total,
			page: entity.page,
			limit: entity.limit,
		};
	}
}

export const roomPresenter = new RoomPresenter();

export interface IRoom {
	id: number;
	name: string;
	description?: string;
	createdBy: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export type ICreateRoomDto = Omit<IRoom, 'id'>;

export type IUpdateRoomDto = Partial<Omit<IRoom, 'id' | 'createdBy'>>;

export type IRoomResponseDto = Pick<IRoom, 'id' | 'name' | 'description'> & {
	createdBy: number;
	createdByUserName?: string;
	roomUsers?: Array<{
		userId: number;
		userName: string;
		userEmail: string;
		role: string;
	}>;
};

export type IRoomListQuery = {
	page: number;
	limit: number;
};

export type IRoomList = {
	rooms: IRoom[];
	total: number;
	page: number;
	limit: number;
};

export type IRoomListResponseDto = {
	rooms: IRoomResponseDto[];
	total: number;
	page: number;
	limit: number;
};

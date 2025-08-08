import { ERoomUserRole } from '../enums/room-user-role.enum';

export interface IRoomParticipant {
	id: number;
	userId: number;
	userName: string;
	userEmail: string;
	role: ERoomUserRole;
}

export interface IRoom {
	id: number;
	name: string;
	description?: string;
	createdBy: number;
	roomUsers?: IRoomParticipant[];
}

export interface ICreateRoomDto {
	name: string;
	description?: string;
}

export interface IUpdateRoomDto {
	name?: string;
	description?: string;
}

export interface IAddUserToRoomDto {
	roomId: number;
	email: string;
	role: ERoomUserRole;
}

export interface IRoomListQuery {
	page?: number;
	limit?: number;
}

export interface IRoomListResponse {
	rooms: IRoom[];
	total: number;
	page: number;
	limit: number;
}

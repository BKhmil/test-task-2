import { ERoomUserRole } from '../enums/room-user-role.enum';

export interface IRoomUser {
	id: number;
	roomId: number;
	userId: number;
	role: ERoomUserRole;
}

export type ICreateRoomUserDto = Omit<IRoomUser, 'id'>;

export type IUpdateRoomUserDto = Partial<
	Omit<IRoomUser, 'id' | 'roomId' | 'userId'>
>;

export type IRoomUserResponseDto = Pick<IRoomUser, 'id' | 'role'> & {
	userId: number;
	userName: string;
	userEmail: string;
	roomId: number;
	roomName: string;
};

export type IAddUserToRoomDto = {
	roomId: number;
	userEmail: string;
	role: ERoomUserRole;
};

export type IRemoveUserFromRoomDto = {
	roomId: number;
	userId: number;
};

export type IUpdateUserRoleDto = {
	roomId: number;
	userId: number;
	role: ERoomUserRole;
};

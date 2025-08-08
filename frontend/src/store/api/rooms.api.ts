import { createApi } from '@reduxjs/toolkit/query/react';
import { EHttpMethod } from '../../enums/http-method.enum';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import {
	createBaseQueryWithReauth,
	setBearerToken,
} from '../../helpers/api.helper';
import type {
	IAddUserToRoomDto,
	ICreateRoomDto,
	IRoom,
	IRoomListQuery,
	IRoomListResponse,
	IUpdateRoomDto,
} from '../../interfaces/room.interface';

export const roomsApi = createApi({
	reducerPath: 'roomsApi',
	baseQuery: createBaseQueryWithReauth('http://localhost:5000/api/rooms/'),
	tagTypes: ['Room', 'User'],
	endpoints: (builder) => ({
		getRooms: builder.query<IRoomListResponse, IRoomListQuery>({
			query: (params) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: '',
					method: EHttpMethod.GET,
					params,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: ['Room'],
		}),

		getSharedRooms: builder.query<IRoomListResponse, IRoomListQuery>({
			query: (params) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: 'shared',
					method: EHttpMethod.GET,
					params,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: ['Room'],
		}),

		getRoomById: builder.query<IRoom, number>({
			query: (id) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: String(id),
					method: EHttpMethod.GET,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: (_, __, id) => [{ type: 'Room', id }],
		}),

		getRoomUsers: builder.query<{ participants: any[] }, number>({
			query: (roomId) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: `${roomId}/users`,
					method: EHttpMethod.GET,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: (_, __, roomId) => [{ type: 'Room', id: roomId }],
		}),

		getRoomPermissions: builder.query<
			{
				isOwner: boolean;
				isAdmin: boolean;
				canAddUsers: boolean;
				canRemoveUsers: boolean;
			},
			number
		>({
			query: (roomId) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: `${roomId}/permissions`,
					method: EHttpMethod.GET,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: (_, __, roomId) => [{ type: 'Room', id: roomId }],
		}),

		createRoom: builder.mutation<IRoom, ICreateRoomDto>({
			query: (data) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: '',
					method: EHttpMethod.POST,
					body: data,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			invalidatesTags: ['Room', 'User'],
		}),

		updateRoom: builder.mutation<IRoom, { id: number; data: IUpdateRoomDto }>({
			query: ({ id, data }) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: String(id),
					method: EHttpMethod.PUT,
					body: data,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			invalidatesTags: (_, __, { id }) => [
				{ type: 'Room', id },
				'Room',
				'User',
			],
		}),

		deleteRoom: builder.mutation<void, number>({
			query: (id) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: String(id),
					method: EHttpMethod.DELETE,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			invalidatesTags: ['Room', 'User'],
		}),

		addUserToRoom: builder.mutation<void, IAddUserToRoomDto>({
			query: ({ roomId, email, role }) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: `${roomId}/users`,
					method: EHttpMethod.POST,
					body: { email, role },
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			invalidatesTags: (_, __, { roomId }) => [
				{ type: 'Room', id: roomId },
				'Room',
				'User',
			],
		}),

		removeUserFromRoom: builder.mutation<void, { roomId: number; userId: number }>({
			query: ({ roomId, userId }) => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: `${roomId}/users/${userId}`,
					method: EHttpMethod.DELETE,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			invalidatesTags: (_, __, { roomId }) => [
				{ type: 'Room', id: roomId },
				'Room',
				'User',
			],
		}),
	}),
});

export const {
	useGetRoomsQuery,
	useGetSharedRoomsQuery,
	useGetRoomByIdQuery,
	useGetRoomUsersQuery,
	useGetRoomPermissionsQuery,
	useCreateRoomMutation,
	useUpdateRoomMutation,
	useDeleteRoomMutation,
	useAddUserToRoomMutation,
	useRemoveUserFromRoomMutation,
} = roomsApi;

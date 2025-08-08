import { createApi } from '@reduxjs/toolkit/query/react';
import { EHttpMethod } from '../../enums/http-method.enum';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import {
	createBaseQueryWithReauth,
	setBearerToken,
} from '../../helpers/api.helper';
import type { IRoom } from '../../interfaces/room.interface';
import type { IUser } from '../../interfaces/user.interface';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: createBaseQueryWithReauth('http://localhost:5000/api/users/'),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getMe: builder.query<IUser, void>({
			query: () => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: 'me',
					method: EHttpMethod.GET,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: ['User'],
		}),

		getMyRoom: builder.query<IRoom, void>({
			query: () => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: 'me/rooms',
					method: EHttpMethod.GET,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
			providesTags: ['User'],
		}),
	}),
});

export const { useGetMeQuery, useGetMyRoomQuery } = userApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { EHttpMethod } from '../../enums/http-method.enum';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import {
	createBaseQueryWithReauth,
	setBearerToken,
} from '../../helpers/api.helper';
import type {
	IAuthResponse,
	ISignInRequest,
	ISignUpRequest,
} from '../../interfaces/auth.interface';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: createBaseQueryWithReauth('http://localhost:5000/api/auth/'),
	endpoints: (builder) => ({
		signUp: builder.mutation<IAuthResponse, ISignUpRequest>({
			query: (body) => ({
				url: 'sign-up',
				method: EHttpMethod.POST,
				body,
			}),
		}),
		signIn: builder.mutation<IAuthResponse, ISignInRequest>({
			query: (body) => ({
				url: 'sign-in',
				method: EHttpMethod.POST,
				body,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: 'logout',
					method: EHttpMethod.POST,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
		}),
		logoutAll: builder.mutation<void, void>({
			query: () => {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				return {
					url: 'logout-all',
					method: EHttpMethod.POST,
					headers: { Authorization: setBearerToken(accessToken) },
				};
			},
		}),
		ping: builder.mutation<void, void>({
			query: () => {
				const refreshToken = localStorage.getItem(
					ELocalStorageKeys.REFRESH_TOKEN,
				);
				return {
					url: 'ping',
					method: EHttpMethod.HEAD,
					headers: { Authorization: setBearerToken(refreshToken) },
				};
			},
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useLogoutMutation,
	useLogoutAllMutation,
	usePingMutation,
} = authApi;

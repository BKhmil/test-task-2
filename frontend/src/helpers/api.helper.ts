import { fetchBaseQuery, type BaseQueryFn } from '@reduxjs/toolkit/query';
import { EHttpMethod } from '../enums/http-method.enum';
import { ELocalStorageKeys } from '../enums/local-storage-keys.enum';
import type { ITokenPair } from '../interfaces/token-pair.interface';

export const setBearerToken = (token: string | null) => {
	return token ? `Bearer ${token}` : 'Bearer ';
};

export const createBaseQueryWithReauth = (baseUrl: string): BaseQueryFn => {
	return async (args, api, extraOptions) => {
		let result = await fetchBaseQuery({ baseUrl })(args, api, extraOptions);
		if (result.error && result.error.status === 401) {
			const refreshToken = localStorage.getItem(
				ELocalStorageKeys.REFRESH_TOKEN,
			);
			if (refreshToken) {
				const refreshResult = await fetchBaseQuery({
					baseUrl: 'http://localhost:5000/api/auth/',
				})(
					{
						url: 'refresh',
						method: EHttpMethod.POST,
						headers: { Authorization: setBearerToken(refreshToken) },
					},
					api,
					extraOptions,
				);
				if (refreshResult.data) {
					const { accessToken, refreshToken: newRefreshToken } =
						refreshResult.data as ITokenPair;
					localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, accessToken);
					localStorage.setItem(
						ELocalStorageKeys.REFRESH_TOKEN,
						newRefreshToken,
					);

					if (typeof args === 'object' && args.headers) {
						args.headers['Authorization'] = setBearerToken(accessToken);
					}
					result = await fetchBaseQuery({ baseUrl })(args, api, extraOptions);
				} else {
					localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
					localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
					localStorage.removeItem('user');
					api.dispatch({ type: 'user/removeUser' });
				}
			} else {
				localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
				localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
				localStorage.removeItem('user');
				api.dispatch({ type: 'user/removeUser' });
			}
		}
		return result;
	};
};

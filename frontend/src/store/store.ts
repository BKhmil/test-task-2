import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { roomsApi } from './api/rooms.api';
import { userApi } from './api/user.api';
import userSlice from './slices/user.slice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[roomsApi.reducerPath]: roomsApi.reducer,
		user: userSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			userApi.middleware,
			roomsApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

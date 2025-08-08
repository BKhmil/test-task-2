import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import type { IUser } from '../../interfaces/user.interface';
import { userSliceActions } from '../../store/slices/user.slice';

const AuthInit = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const accessToken = localStorage.getItem(
					ELocalStorageKeys.ACCESS_TOKEN,
				);
				const refreshToken = localStorage.getItem(
					ELocalStorageKeys.REFRESH_TOKEN,
				);

				if (!accessToken || !refreshToken) {
					dispatch(userSliceActions.removeUser());
					setIsLoading(false);
					return;
				}

				const userData = localStorage.getItem('user');
				if (userData) {
					const user: IUser = JSON.parse(userData);
					dispatch(userSliceActions.setUser(user));
				} else {
					localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
					localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
					dispatch(userSliceActions.removeUser());
				}
			} catch {
				localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
				localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
				localStorage.removeItem('user');
				dispatch(userSliceActions.removeUser());
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, [dispatch]);

	useEffect(() => {
		(window as any).authInitLoading = isLoading;
	}, [isLoading]);

	return null;
};

export default AuthInit;

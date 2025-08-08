import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import { useAppDispatch } from '../../hooks/rtk';
import {
	useLogoutAllMutation,
	useLogoutMutation,
} from '../../store/api/auth.api';
import { userSliceActions } from '../../store/slices/user.slice';

interface UserMenuProps {
	username: string;
}

const UserMenu = ({ username }: UserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const [logout] = useLogoutMutation();
	const [logoutAll] = useLogoutAllMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			dispatch(userSliceActions.removeUser());
			localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
			localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
			localStorage.removeItem('user');
			navigate('/');
		} catch {
			dispatch(userSliceActions.removeUser());
			localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
			localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
			localStorage.removeItem('user');
			navigate('/');
		}
	};

	const handleLogoutAll = async () => {
		try {
			await logoutAll().unwrap();
			dispatch(userSliceActions.removeUser());
			localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
			localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
			localStorage.removeItem('user');
			navigate('/');
		} catch {
			dispatch(userSliceActions.removeUser());
			localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
			localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
			localStorage.removeItem('user');
			navigate('/');
		}
	};

	return (
		<div className='relative' ref={menuRef}>
			<button
				type='button'
				className='bg-gray-700 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-600 hover:scale-105'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className='text-xl'>👤</span>
			</button>

			{isOpen && (
				<div className='absolute top-full right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl min-w-[200px] z-50 overflow-hidden'>
					<div className='p-4 border-b border-gray-600'>
						<span className='text-gray-100 font-semibold text-sm'>
							{username}
						</span>
					</div>

					<div className='h-px bg-gray-600 my-2'></div>

					<button
						type='button'
						className='w-full p-3 bg-transparent border-none text-gray-100 text-left cursor-pointer text-sm transition-colors hover:bg-gray-700'
						onClick={handleLogout}
					>
						Logout
					</button>

					<button
						type='button'
						className='w-full p-3 bg-transparent border-none text-red-400 text-left cursor-pointer text-sm transition-colors hover:bg-red-900/20'
						onClick={handleLogoutAll}
					>
						Logout All Devices
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

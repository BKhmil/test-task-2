import { useNavigate } from 'react-router-dom';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import { useAppDispatch } from '../../hooks/rtk';
import {
	useLogoutAllMutation,
	useLogoutMutation,
} from '../../store/api/auth.api';
import { userSliceActions } from '../../store/slices/user.slice';

interface LogoutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
	const [logout] = useLogoutMutation();
	const [logoutAll] = useLogoutAllMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const clearUserData = () => {
		localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
		localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
		localStorage.removeItem('user');
		dispatch(userSliceActions.removeUser());
	};

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			clearUserData();
			onClose();
			navigate('/');
		} catch {
			clearUserData();
			onClose();
			navigate('/');
		}
	};

	const handleLogoutAll = async () => {
		try {
			await logoutAll().unwrap();
			clearUserData();
			onClose();
			navigate('/');
		} catch {
			clearUserData();
			onClose();
			navigate('/');
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={onClose}
		>
			<div
				className='bg-gray-800 border border-gray-600 rounded-lg shadow-2xl min-w-[400px] max-w-md mx-4'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex justify-between items-center p-6 border-b border-gray-600'>
					<h2 className='text-xl font-semibold text-gray-100'>Logout</h2>
					<button
						type='button'
						className='bg-transparent border-none text-gray-400 text-2xl cursor-pointer hover:text-gray-200 transition-colors'
						onClick={onClose}
					>
						×
					</button>
				</div>

				<div className='p-6'>
					<p className='text-gray-300 mb-6'>
						Choose how you want to logout from your account:
					</p>

					<div className='flex flex-col gap-3'>
						<button
							type='button'
							className='w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
							onClick={handleLogout}
						>
							Logout
						</button>

						<button
							type='button'
							className='w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors'
							onClick={handleLogoutAll}
						>
							Logout All Devices
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;

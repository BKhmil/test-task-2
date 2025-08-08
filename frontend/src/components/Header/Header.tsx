import { useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import LogoutModal from '../LogoutModal/LogoutModal';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';

const Header: FC = () => {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const user = useSelector((state: RootState) => state.user.user);
	const isAuthenticated = !!user;

	return (
		<header className='border-b shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700/50 backdrop-blur-sm'>
			<div className='container px-6 py-4 mx-auto'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-6'>
						<div className='flex items-center space-x-3'>
							<div className='flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl'>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
									/>
								</svg>
							</div>
							<h1 className='text-2xl font-bold text-white'>Meeting Rooms</h1>
						</div>
						<Navigation />
					</div>

					<div className='flex items-center space-x-4'>
						{isAuthenticated && user ? (
							<div className='flex items-center space-x-3'>
								<div className='flex items-center px-4 py-2 space-x-3 border bg-gray-800/50 border-gray-700/50 rounded-xl backdrop-blur-sm'>
									<div className='flex items-center justify-center w-8 h-8 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600'>
										<span className='text-sm font-semibold text-white'>
											{user.name?.charAt(0)?.toUpperCase() || 'U'}
										</span>
									</div>
									<span className='text-sm font-medium text-gray-200'>
										{user.name || 'User'}
									</span>
								</div>
								<UserMenu username={user.name || 'User'} />
							</div>
						) : (
							<div className='flex items-center space-x-3'>
								<a
									href='/auth/sign-in'
									className='px-4 py-2 font-medium text-gray-300 transition-all duration-200 border rounded-lg hover:text-gray-100 hover:bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50'
								>
									Sign In
								</a>
								<a
									href='/auth/sign-up'
									className='px-6 py-2 font-semibold text-white transition-all duration-200 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg'
								>
									Sign Up
								</a>
							</div>
						)}
					</div>
				</div>
			</div>

			<LogoutModal
				isOpen={isLogoutModalOpen}
				onClose={() => setIsLogoutModalOpen(false)}
			/>
		</header>
	);
};

export default Header;

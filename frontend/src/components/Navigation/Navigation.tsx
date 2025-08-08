import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState } from '../../store/store';

const Navigation = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const isAuthenticated = !!user;

	return (
		<nav className='flex items-center space-x-8'>
			<NavLink
				to='/'
				className={({ isActive }) =>
					`relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 rounded-lg hover:bg-gray-800/50 ${
						isActive
							? 'text-white bg-gray-800/50 shadow-lg'
							: 'hover:bg-gray-800/30'
					}`
				}
				end
			>
				{({ isActive }) => (
					<>
						<span className='flex items-center gap-2'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
								/>
							</svg>
							Home
						</span>
						{isActive && (
							<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></div>
						)}
					</>
				)}
			</NavLink>

			{isAuthenticated && (
				<>
					<NavLink
						to='/my-room'
						className={({ isActive }) =>
							`relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 rounded-lg hover:bg-gray-800/50 ${
								isActive
									? 'text-white bg-gray-800/50 shadow-lg'
									: 'hover:bg-gray-800/30'
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span className='flex items-center gap-2'>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
										/>
									</svg>
									My Room
								</span>
								{isActive && (
									<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></div>
								)}
							</>
						)}
					</NavLink>

					<NavLink
						to='/shared-rooms'
						className={({ isActive }) =>
							`relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 rounded-lg hover:bg-gray-800/50 ${
								isActive
									? 'text-white bg-gray-800/50 shadow-lg'
									: 'hover:bg-gray-800/30'
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span className='flex items-center gap-2'>
									<svg
										className='w-4 h-4'
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
									Shared Rooms
								</span>
								{isActive && (
									<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></div>
								)}
							</>
						)}
					</NavLink>
				</>
			)}
		</nav>
	);
};

export default Navigation;

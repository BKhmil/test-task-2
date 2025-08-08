import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/rtk';

const HomePage = () => {
	const { user } = useAppSelector((state) => state.user);
	const isAuthenticated = !!user;

	return (
		<div className='min-h-screen'>
			<div className='container mx-auto px-6 py-16'>
				<div className='text-center max-w-5xl mx-auto'>
					<div className='mb-16'>
						<h1 className='text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6'>
							Meeting Room Management
						</h1>
						<p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
							Streamline your team's collaboration with our modern meeting room
							management system
						</p>

						<div className='flex flex-col sm:flex-row gap-6 justify-center mb-16'>
							{isAuthenticated ? (
								<>
									<Link
										to='/my-room'
										className='group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl'
									>
										My Room
									</Link>
									<Link
										to='/shared-rooms'
										className='group inline-flex items-center px-8 py-4 bg-gray-800/50 text-blue-400 font-semibold rounded-xl border-2 border-blue-400/50 hover:bg-gray-700/50 hover:border-blue-400 transition-all duration-200 transform hover:scale-105'
									>
										Shared Rooms
									</Link>
								</>
							) : (
								<Link
									to='/auth/sign-in'
									className='group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl'
								>
									Sign In
								</Link>
							)}
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2'>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative z-10'>
								<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white text-2xl'>
									🏢
								</div>
								<h3 className='text-xl font-semibold text-gray-100 mb-4'>
									Room Management
								</h3>
								<p className='text-gray-300 leading-relaxed'>
									Create and manage meeting rooms with our intuitive interface
								</p>
							</div>
						</div>

						<div className='group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2'>
							<div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative z-10'>
								<div className='w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white text-2xl'>
									✅
								</div>
								<h3 className='text-xl font-semibold text-gray-100 mb-4'>
									Smart Access Control
								</h3>
								<p className='text-gray-300 leading-relaxed'>
									Manage room access with flexible roles and permissions
								</p>
							</div>
						</div>

						<div className='group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2'>
							<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative z-10'>
								<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white text-2xl'>
									👥
								</div>
								<h3 className='text-xl font-semibold text-gray-100 mb-4'>
									Team Collaboration
								</h3>
								<p className='text-gray-300 leading-relaxed'>
									Share rooms with team members and manage access efficiently
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

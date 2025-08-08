import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components';
import { useAppSelector } from '../../hooks/rtk';
import { useRooms } from '../../hooks/useRooms';

const MeetingRoomsPage: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	const isAuthenticated = !!user;
	const {
		roomsData,
		isLoading,
		error,
		currentPage,
		totalPages,
		handlePageChange,
	} = useRooms();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<div className='text-red-400 mb-4'>
						{!isAuthenticated
							? 'Please sign in to view rooms'
							: 'Error loading rooms'}
					</div>
					{!isAuthenticated ? (
						<a
							href='/auth/sign-in'
							className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
						>
							Sign In
						</a>
					) : (
						<button
							onClick={() => window.location.reload()}
							className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
						>
							Retry
						</button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold text-gray-100'>Meeting Rooms</h1>
				{isAuthenticated && (
					<button
						onClick={() => navigate('/my-room')}
						className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
					>
						My Room
					</button>
				)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{roomsData?.rooms.map((room) => (
					<div
						key={room.id}
						className='bg-gray-800 rounded-lg shadow-md p-6 border border-gray-600'
					>
						<h3 className='text-xl font-semibold text-gray-100 mb-4'>
							{room.name}
						</h3>
						{room.description && (
							<p className='text-gray-300 mb-4'>{room.description}</p>
						)}
						<div className='text-sm text-gray-400'>
							Created by: User ID {room.createdBy}
						</div>
					</div>
				))}
			</div>

			{roomsData?.rooms.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-400 text-lg'>
						{!isAuthenticated
							? 'Please sign in to view rooms'
							: 'No rooms found. Create your first room!'}
					</p>
					{!isAuthenticated && (
						<a
							href='/auth/sign-in'
							className='inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
						>
							Sign In
						</a>
					)}
				</div>
			)}

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
};

export default MeetingRoomsPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components';
import { useGetSharedRoomsQuery } from '../../store/api/rooms.api';

const SharedRoomsPage: React.FC = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(3);

	const {
		data: roomsData,
		isLoading,
		error,
	} = useGetSharedRoomsQuery({
		page: currentPage,
		limit,
	});

	const totalPages = roomsData ? Math.ceil(roomsData.total / limit) : 0;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleRoomClick = (roomId: number) => {
		navigate(`/meeting-rooms/${roomId}`);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<div className='mb-4 text-red-400'>Error loading shared rooms</div>
					<button
						onClick={() => window.location.reload()}
						className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='container px-4 py-8 mx-auto'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold text-gray-100'>Shared Rooms</h1>
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{roomsData?.rooms.map((room) => (
					<div
						key={room.id}
						onClick={() => handleRoomClick(room.id)}
						className='p-6 transition-colors duration-200 bg-gray-800 border border-gray-600 rounded-lg shadow-md cursor-pointer hover:bg-gray-700'
					>
						<h3 className='mb-4 text-xl font-semibold text-gray-100'>
							{room.name}
						</h3>
						{room.description && (
							<p className='mb-4 text-gray-300'>{room.description}</p>
						)}
						<div className='text-sm text-gray-400'>
							Created by: User ID {room.createdBy}
						</div>
					</div>
				))}
			</div>

			{roomsData?.rooms.length === 0 && (
				<div className='py-12 text-center'>
					<p className='text-lg text-gray-400'>
						No shared rooms found. You haven't been added to any rooms yet.
					</p>
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

export default SharedRoomsPage;

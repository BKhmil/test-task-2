import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRoomModal, EditRoomModal } from '../../components';
import type {
	ICreateRoomDto,
	IUpdateRoomDto,
} from '../../interfaces/room.interface';
import {
	useCreateRoomMutation,
	useDeleteRoomMutation,
	useUpdateRoomMutation,
} from '../../store/api/rooms.api';
import { useGetMyRoomQuery } from '../../store/api/user.api';

const MyRoomPage: React.FC = () => {
	const navigate = useNavigate();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const { data: room, isLoading, error, refetch } = useGetMyRoomQuery();
	const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
	const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();
	const [deleteRoom] = useDeleteRoomMutation();

	const handleUpdateRoom = async (data: IUpdateRoomDto) => {
		if (!room) return;
		try {
			await updateRoom({ id: room.id, data }).unwrap();
			await refetch();
			setIsEditModalOpen(false);
		} catch {
			// Error handling
		}
	};

	const handleCreateRoom = async (data: ICreateRoomDto) => {
		try {
			await createRoom(data).unwrap();
			await refetch();
			setIsCreateModalOpen(false);
		} catch {
			// Error handling
		}
	};

	const handleDeleteRoom = async () => {
		if (!room) return;
		setIsDeleting(true);
		try {
			await deleteRoom(room.id).unwrap();
			await refetch();
			setIsDeleteModalOpen(false);
		} catch {
			// Error handling
		} finally {
			setIsDeleting(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-100 mb-4'>My Room</h1>
					<p className='text-gray-400 mb-6'>
						Failed to load your room. Please try again later.
					</p>
					<button
						onClick={() => window.location.reload()}
						className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (!room) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-100 mb-4'>My Room</h1>
					<p className='text-gray-400 mb-6'>You haven't created a room yet.</p>
					<button
						onClick={() => setIsCreateModalOpen(true)}
						className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
					>
						Create Your First Room
					</button>
				</div>

				<CreateRoomModal
					isOpen={isCreateModalOpen}
					onClose={() => setIsCreateModalOpen(false)}
					onSubmit={handleCreateRoom}
					isLoading={isCreating}
				/>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-2xl mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold text-gray-100'>My Room</h1>
					<div className='flex space-x-3'>
						<button
							onClick={() => navigate(`/meeting-rooms/${room.id}`)}
							className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700'
						>
							View Details
						</button>
						<button
							onClick={() => setIsEditModalOpen(true)}
							className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
						>
							Edit Room
						</button>
						<button
							onClick={() => setIsDeleteModalOpen(true)}
							className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'
						>
							Delete Room
						</button>
					</div>
				</div>

				<div className='bg-gray-800 rounded-lg shadow-md p-6 border border-gray-600'>
					<h2 className='text-2xl font-semibold text-gray-100 mb-4'>
						{room.name}
					</h2>
					{room.description && (
						<p className='text-gray-300 mb-4'>{room.description}</p>
					)}
				</div>
			</div>

			<EditRoomModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onSubmit={handleUpdateRoom}
				isLoading={isUpdating}
				room={room}
			/>

			{isDeleteModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
					<div className='bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4'>
						<h3 className='text-xl font-semibold text-gray-100 mb-4'>
							Delete Room
						</h3>
						<p className='text-gray-300 mb-6'>
							Are you sure you want to delete your room? This action cannot be
							undone.
						</p>
						<div className='flex gap-3'>
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className='flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
							>
								Cancel
							</button>
							<button
								onClick={handleDeleteRoom}
								disabled={isDeleting}
								className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors'
							>
								{isDeleting ? 'Deleting...' : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyRoomPage;

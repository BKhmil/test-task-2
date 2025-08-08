import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddUserModal } from '../../components';
import { ERoomUserRole } from '../../enums/room-user-role.enum';
import {
	useGetRoomByIdQuery,
	useGetRoomPermissionsQuery,
	useGetRoomUsersQuery,
	useRemoveUserFromRoomMutation,
} from '../../store/api/rooms.api';

const RoomDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

	const {
		data: room,
		isLoading: isRoomLoading,
		error: roomError,
	} = useGetRoomByIdQuery(Number(id));
	const {
		data: usersData,
		isLoading: isUsersLoading,
		error: usersError,
	} = useGetRoomUsersQuery(Number(id));
	const { data: permissions, isLoading: isPermissionsLoading } =
		useGetRoomPermissionsQuery(Number(id));
	const [removeUserFromRoom] = useRemoveUserFromRoomMutation();

	const handleRemoveUser = async (userId: number) => {
		try {
			await removeUserFromRoom({
				roomId: Number(id),
				userId,
			}).unwrap();
		} catch {
			//
		}
	};

	if (isRoomLoading || isUsersLoading || isPermissionsLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin'></div>
			</div>
		);
	}

	if (roomError || usersError || !room) {
		return (
			<div className='container px-4 py-8 mx-auto'>
				<div className='text-center'>
					<h1 className='mb-4 text-2xl font-bold text-gray-100'>
						Room Details
					</h1>
					<p className='mb-6 text-gray-400'>
						Failed to load room details. Please try again later.
					</p>
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

	const participants = usersData?.participants || [];

	return (
		<div className='container px-4 py-8 mx-auto'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-3xl font-bold text-gray-100'>Room Details</h1>
					{permissions?.canAddUsers && (
						<button
							onClick={() => setIsAddUserModalOpen(true)}
							className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
						>
							Add User
						</button>
					)}
				</div>

				<div className='p-6 mb-6 bg-gray-800 border border-gray-600 rounded-lg shadow-md'>
					<h2 className='mb-4 text-2xl font-semibold text-gray-100'>
						{room.name}
					</h2>
					{room.description && (
						<p className='mb-4 text-gray-300'>{room.description}</p>
					)}
				</div>

				<div className='p-6 bg-gray-800 border border-gray-600 rounded-lg shadow-md'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-semibold text-gray-100'>
							Participants ({participants.length})
						</h3>
					</div>

					{participants.length > 0 ? (
						<div className='space-y-3'>
							{participants.slice(0, 5).map((participant) => (
								<div
									key={participant.userId}
									className='flex items-center justify-between p-3 bg-gray-700 rounded-lg'
								>
									<div className='flex items-center space-x-3'>
										<div className='flex items-center space-x-2'>
											<span className='font-medium text-gray-300'>
												{participant.userName}
											</span>
											{participant.role === ERoomUserRole.ADMIN && (
												<span className='px-2 py-1 text-xs text-white bg-red-600 rounded-full'>
													Admin
												</span>
											)}
											{permissions?.isOwner &&
												participant.userId === room.createdBy && (
													<span className='px-2 py-1 text-xs text-white bg-green-600 rounded-full'>
														Owner
													</span>
												)}
										</div>
										<span className='text-sm text-gray-400'>
											{participant.userEmail}
										</span>
									</div>
									{permissions?.canRemoveUsers &&
										participant.userId !== room.createdBy && (
											<button
												onClick={() => handleRemoveUser(participant.userId)}
												className='text-sm text-red-400 hover:text-red-300'
											>
												Remove
											</button>
										)}
								</div>
							))}
							{participants.length > 5 && (
								<div className='py-2 text-sm text-center text-gray-400'>
									+{participants.length - 5} more participants
								</div>
							)}
						</div>
					) : (
						<div className='py-8 text-center'>
							<p className='text-gray-400'>No participants yet.</p>
						</div>
					)}
				</div>
			</div>

			<AddUserModal
				isOpen={isAddUserModalOpen}
				onClose={() => setIsAddUserModalOpen(false)}
				roomId={room.id}
			/>
		</div>
	);
};

export default RoomDetailsPage;

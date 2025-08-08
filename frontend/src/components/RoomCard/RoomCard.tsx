import React from 'react';
import type { IRoom } from '../../interfaces/room.interface';

interface RoomCardProps {
	room: IRoom;
	onEdit: (room: IRoom) => void;
	onDelete: (roomId: number) => void;
	isDeleting: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
	room,
	onEdit,
	onDelete,
	isDeleting,
}) => {
	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<div className='flex justify-between items-start mb-4'>
				<h3 className='text-xl font-semibold text-gray-900'>{room.name}</h3>
				<div className='flex space-x-2'>
					<button
						onClick={() => onEdit(room)}
						className='text-blue-600 hover:text-blue-800'
					>
						Edit
					</button>
					<button
						onClick={() => onDelete(room.id)}
						disabled={isDeleting}
						className='text-red-600 hover:text-red-800 disabled:opacity-50'
					>
						Delete
					</button>
				</div>
			</div>
			{room.description && (
				<p className='text-gray-600 mb-4'>{room.description}</p>
			)}
			<div className='text-sm text-gray-500'>
				Created by: User ID {room.createdBy}
			</div>
		</div>
	);
};

export default RoomCard;

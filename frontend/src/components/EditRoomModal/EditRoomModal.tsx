import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { IUpdateRoomDto } from '../../interfaces/room.interface';

interface EditRoomModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: IUpdateRoomDto) => void;
	isLoading: boolean;
	room: { id: number; name: string; description?: string } | null;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	isLoading,
	room,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUpdateRoomDto>({
		defaultValues: {
			name: room?.name || '',
			description: room?.description || '',
		},
	});

	useEffect(() => {
		if (room) {
			reset({
				name: room.name,
				description: room.description || '',
			});
		}
	}, [room, reset]);

	const onSubmitForm = (data: IUpdateRoomDto) => {
		onSubmit(data);
	};

	if (!isOpen || !room) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-600'>
				<h2 className='text-xl font-bold mb-4 text-white'>Edit Room</h2>
				<form onSubmit={handleSubmit(onSubmitForm)} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>
							Room Name
						</label>
						<input
							placeholder='Room Name'
							type='text'
							{...register('name', { required: 'Room name is required' })}
							className='w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400'
						/>
						{errors.name && (
							<p className='text-red-400 text-sm mt-1'>{errors.name.message}</p>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>
							Description
						</label>
						<textarea
							placeholder='Description'
							{...register('description')}
							className='w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400'
							rows={3}
						/>
						{errors.description && (
							<p className='text-red-400 text-sm mt-1'>{errors.description.message}</p>
						)}
					</div>
					<div className='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
						>
							{isLoading ? 'Updating...' : 'Update Room'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditRoomModal;

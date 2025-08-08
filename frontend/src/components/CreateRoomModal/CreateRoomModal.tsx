import React from 'react';
import { useForm } from 'react-hook-form';
import type { ICreateRoomDto } from '../../interfaces/room.interface';

interface CreateRoomModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: ICreateRoomDto) => void;
	isLoading: boolean;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	isLoading,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICreateRoomDto>({
		defaultValues: {
			name: '',
			description: '',
		},
	});

	const onSubmitForm = (data: ICreateRoomDto) => {
		onSubmit(data);
		reset();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='w-full max-w-md p-6 bg-gray-800 border border-gray-600 rounded-lg'>
				<h2 className='mb-4 text-xl font-bold text-white'>Create New Room</h2>
				<form onSubmit={handleSubmit(onSubmitForm)} className='space-y-4'>
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-300'>
							Room Name
						</label>
						<input
							placeholder='Room Name'
							type='text'
							{...register('name', { required: 'Room name is required' })}
							className='w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.name && (
							<p className='mt-1 text-sm text-red-400'>{errors.name.message}</p>
						)}
					</div>
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-300'>
							Description
						</label>
						<textarea
							placeholder='Description'
							{...register('description')}
							className='w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							rows={3}
						/>
						{errors.description && (
							<p className='mt-1 text-sm text-red-400'>{errors.description.message}</p>
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
							className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50'
						>
							{isLoading ? 'Creating...' : 'Create Room'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRoomModal;

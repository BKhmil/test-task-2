import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ERoomUserRole } from '../../enums/room-user-role.enum';
import { useAddUserToRoomMutation } from '../../store/api/rooms.api';
import { useGetMeQuery } from '../../store/api/user.api';

interface AddUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	roomId: number;
}

interface FormData {
	email: string;
	role: ERoomUserRole;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
	isOpen,
	onClose,
	roomId,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [addUserToRoom] = useAddUserToRoomMutation();
	const { data: currentUser } = useGetMeQuery();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			role: ERoomUserRole.USER,
		},
	});

	const watchedEmail = watch('email');
	const isAddingSelf = currentUser?.email === watchedEmail;

	const onSubmit = async (data: FormData) => {
		if (isAddingSelf) {
			return;
		}

		setIsSubmitting(true);
		try {
			await addUserToRoom({
				roomId,
				email: data.email,
				role: data.role,
			}).unwrap();
			reset();
			onClose();
		} catch {
			// Error handling is done by RTK Query
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='w-full max-w-md p-6 mx-4 bg-gray-800 rounded-xl'>
				<h3 className='mb-4 text-xl font-semibold text-gray-100'>
					Add User to Room
				</h3>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-300'>
							Email
						</label>
						<input
							type='email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
							})}
							className='w-full px-3 py-2 text-gray-100 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter user email'
						/>
						{errors.email && (
							<p className='mt-1 text-sm text-red-400'>
								{errors.email.message}
							</p>
						)}
						{isAddingSelf && (
							<p className='mt-1 text-sm text-yellow-400'>
								You cannot add yourself to the room
							</p>
						)}
					</div>

					<div>
						<label className='block mb-2 text-sm font-medium text-gray-300'>
							Role
						</label>
						<select
							{...register('role', { required: 'Role is required' })}
							className='w-full px-3 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value={ERoomUserRole.USER}>User</option>
							<option value={ERoomUserRole.ADMIN}>Admin</option>
						</select>
						{errors.role && (
							<p className='mt-1 text-sm text-red-400'>{errors.role.message}</p>
						)}
					</div>

					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='flex-1 px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isSubmitting || isAddingSelf}
							className='flex-1 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50'
						>
							{isSubmitting ? 'Adding...' : 'Add User'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddUserModal;

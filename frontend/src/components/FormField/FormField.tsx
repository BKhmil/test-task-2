import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
	label: string;
	icon: React.ReactNode;
	register: UseFormRegisterReturn;
	error?: FieldError;
	type?: string;
	placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	icon,
	register,
	error,
	type = 'text',
	placeholder,
}) => {
	return (
		<div className='space-y-2'>
			<label className='text-gray-200 font-medium text-sm flex items-center gap-2'>
				{icon}
				{label}
			</label>
			<input
				type={type}
				{...register}
				className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-100 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500 ${
					error ? 'border-red-500/50 focus:ring-red-500/50' : ''
				}`}
				placeholder={placeholder}
			/>
			{error && (
				<span className='text-red-400 text-xs flex items-center gap-1 mt-1'>
					<svg
						className='w-3 h-3'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					{error.message}
				</span>
			)}
		</div>
	);
};

export default FormField;

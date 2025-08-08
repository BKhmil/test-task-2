import React from 'react';

interface StatusMessageProps {
	type: 'success' | 'error' | 'loading';
	message: string;
	isLoading?: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
	type,
	message,
	isLoading,
}) => {
	if (type === 'loading' && isLoading) {
		return (
			<div className='mt-6 text-blue-400 text-center text-sm flex items-center justify-center gap-2'>
				<svg
					className='animate-spin h-4 w-4'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					></path>
				</svg>
				{message}
			</div>
		);
	}

	if (type === 'error' && message) {
		return (
			<div className='mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm flex items-center justify-center gap-2'>
				<svg
					className='w-4 h-4'
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
				{message}
			</div>
		);
	}

	if (type === 'success' && message) {
		return (
			<div className='mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center text-sm flex items-center justify-center gap-2'>
				<svg
					className='w-4 h-4'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
				{message}
			</div>
		);
	}

	return null;
};

export default StatusMessage;

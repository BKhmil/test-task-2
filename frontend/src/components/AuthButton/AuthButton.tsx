import React from 'react';

interface AuthButtonProps {
	isLoading: boolean;
	loadingText: string;
	children: React.ReactNode;
	icon: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({
	isLoading,
	loadingText,
	children,
	icon,
}) => {
	return (
		<button
			type='submit'
			disabled={isLoading}
			className='w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl text-base transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
		>
			{isLoading ? (
				<>
					<svg
						className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
					{loadingText}
				</>
			) : (
				<>
					{icon}
					{children}
				</>
			)}
		</button>
	);
};

export default AuthButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
	children,
	title,
	subtitle,
}) => {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4 py-8'>
			<div className='relative w-full max-w-md'>
				<div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20'></div>
				<div className='relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-8'>
					<button
						type='button'
						className='absolute top-6 right-6 w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-all duration-200 group'
						onClick={() => navigate('/')}
						aria-label='Close'
					>
						<svg
							className='w-4 h-4 group-hover:scale-110 transition-transform'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>

					<div className='text-center mb-8'>
						<h2 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2'>
							{title}
						</h2>
						<p className='text-gray-400 text-sm'>{subtitle}</p>
					</div>

					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;

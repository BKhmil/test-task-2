import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<div className="text-center">
				<div className="text-9xl font-bold text-blue-400 mb-4">404</div>
				<h1 className="text-4xl font-bold text-gray-100 mb-4">Page Not Found</h1>
				<p className="text-xl text-gray-300 mb-8">
					Sorry, the page you are looking for doesn't exist or has been moved.
				</p>
				<button
					type='button'
					className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
					onClick={handleGoHome}
				>
					Go to Home
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;

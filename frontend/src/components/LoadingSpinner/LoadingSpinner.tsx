const LoadingSpinner = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[200px]">
			<div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
			<div className="mt-4 text-gray-300">Loading...</div>
		</div>
	);
};

export default LoadingSpinner;

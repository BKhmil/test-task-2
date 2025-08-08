import { type FC } from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) {
		return null;
	}

	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const visiblePages = getVisiblePages();

	return (
		<div className='flex items-center justify-center space-x-2 py-6'>
			<button
				className='px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				← Previous
			</button>

			<div className='flex items-center space-x-1'>
				{visiblePages.map((page, index) => (
					<button
						key={index}
						className={`px-3 py-2 text-sm font-medium rounded-md ${
							page === currentPage
								? 'bg-blue-600 text-white border border-blue-600'
								: typeof page === 'number'
								? 'text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white'
								: 'text-gray-500 cursor-default'
						}`}
						onClick={() => typeof page === 'number' && onPageChange(page)}
						disabled={typeof page !== 'number'}
					>
						{page}
					</button>
				))}
			</div>

			<button
				className='px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next →
			</button>
		</div>
	);
};

export default Pagination;

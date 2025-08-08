import { useState } from 'react';
import { useGetRoomsQuery } from '../store/api/rooms.api';
import { useAppSelector } from './rtk';

export const useRooms = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(3);
	const { user } = useAppSelector((state) => state.user);
	const isAuthenticated = !!user;

	const {
		data: roomsData,
		isLoading,
		error,
	} = useGetRoomsQuery(
		{ page: currentPage, limit },
		{ skip: !isAuthenticated },
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const totalPages = roomsData ? Math.ceil(roomsData.total / limit) : 0;

	return {
		roomsData,
		isLoading,
		error,
		currentPage,
		totalPages,
		handlePageChange,
	};
};

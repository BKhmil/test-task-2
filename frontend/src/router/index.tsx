import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import HomePage from '../pages/HomePage/HomePage';
import MeetingRoomsPage from '../pages/MeetingRoomsPage/MeetingRoomsPage';
import MyRoomPage from '../pages/MyRoomPage/MyRoomPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RoomDetailsPage from '../pages/RoomDetailsPage/RoomDetailsPage';
import SharedRoomsPage from '../pages/SharedRoomsPage/SharedRoomsPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'meeting-rooms', element: <MeetingRoomsPage /> },
			{ path: 'meeting-rooms/:id', element: <RoomDetailsPage /> },
			{ path: 'my-room', element: <MyRoomPage /> },
			{ path: 'shared-rooms', element: <SharedRoomsPage /> },
		],
	},
	{
		path: 'auth',
		children: [
			{ path: 'sign-in', element: <SignInPage /> },
			{ path: 'sign-up', element: <SignUpPage /> },
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

const router = createBrowserRouter(routes);
export default router;

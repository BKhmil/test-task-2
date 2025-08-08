import { Outlet } from 'react-router-dom';
import AuthInit from '../../components/AuthInit/AuthInit';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const MainLayout = () => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-900'>
			<AuthInit />
			<Header />
			<main className='flex-1 bg-gray-900'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;

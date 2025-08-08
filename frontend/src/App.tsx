import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import AuthInit from './components/AuthInit/AuthInit';
import router from './router';
import { store } from './store/store';

const App = () => {
	useEffect(() => {
		document.documentElement.classList.add('dark');
	}, []);

	return (
		<Provider store={store}>
			<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
				<AuthInit />
				<RouterProvider router={router} />
			</div>
		</Provider>
	);
};

export default App;

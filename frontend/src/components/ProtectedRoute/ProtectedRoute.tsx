import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.user);
	const [isAuthInitComplete, setIsAuthInitComplete] = useState(false);

	useEffect(() => {
		const checkAuthInit = () => {
			const authInitLoading = (window as any).authInitLoading;
			if (authInitLoading === false) {
				setIsAuthInitComplete(true);
			} else {
				setTimeout(checkAuthInit, 100);
			}
		};

		checkAuthInit();
	}, []);

	useEffect(() => {
		if (isAuthInitComplete && !user) {
			navigate('/auth/sign-in', { replace: true });
		}
	}, [user, navigate, isAuthInitComplete]);

	if (!isAuthInitComplete) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;

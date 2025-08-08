import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	AuthButton,
	AuthLayout,
	FormField,
	StatusMessage,
} from '../../components';
import { ELocalStorageKeys } from '../../enums/local-storage-keys.enum';
import { useAppDispatch } from '../../hooks/rtk';
import type { ISignInRequest } from '../../interfaces/auth.interface';
import { useSignInMutation } from '../../store/api/auth.api';
import { userSliceActions } from '../../store/slices/user.slice';

const SignInPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignInRequest>();
	const [signIn, { isLoading }] = useSignInMutation();
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = async (data: ISignInRequest) => {
		try {
			setErrorMsg('');
			const response = await signIn(data).unwrap();

			localStorage.setItem(
				ELocalStorageKeys.ACCESS_TOKEN,
				response.tokens.accessToken,
			);
			localStorage.setItem(
				ELocalStorageKeys.REFRESH_TOKEN,
				response.tokens.refreshToken,
			);

			if (!response.user) {
				throw new Error('User data not received from server');
			}

			const userData = {
				...response.user,
				createdAt: response.user.createdAt
					? new Date(response.user.createdAt)
					: undefined,
				updatedAt: response.user.updatedAt
					? new Date(response.user.updatedAt)
					: undefined,
			};

			dispatch(userSliceActions.setUser(userData));

			localStorage.setItem('user', JSON.stringify(userData));

			setSuccessMsg('Successfully signed in!');
			navigate('/');
		} catch (error: unknown) {
			const errorMessage =
				error &&
				typeof error === 'object' &&
				'data' in error &&
				error.data &&
				typeof error.data === 'object' &&
				'message' in error.data
					? String(error.data.message)
					: 'Sign in failed. Please try again.';
			setErrorMsg(errorMessage);
		}
	};

	const emailIcon = (
		<svg
			className='w-4 h-4 text-blue-400'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
			/>
		</svg>
	);

	const passwordIcon = (
		<svg
			className='w-4 h-4 text-blue-400'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
			/>
		</svg>
	);

	const signInIcon = (
		<svg
			className='w-5 h-5'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
			/>
		</svg>
	);

	return (
		<AuthLayout
			title='Welcome Back'
			subtitle='Sign in to your account to continue'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					label='Email'
					icon={emailIcon}
					register={register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Invalid email address',
						},
					})}
					error={errors.email}
					type='email'
					placeholder='Enter your email'
				/>

				<FormField
					label='Password'
					icon={passwordIcon}
					register={register('password', {
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters',
						},
						pattern: {
							value:
								/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
							message:
								'Password must contain at least one letter, one number, and one special character (@$!%_*#?&)',
						},
					})}
					error={errors.password}
					type='password'
					placeholder='Enter your password'
				/>

				<AuthButton
					isLoading={isLoading}
					loadingText='Signing In...'
					icon={signInIcon}
				>
					Sign In
				</AuthButton>
			</form>

			<StatusMessage
				type='loading'
				message='Signing you in...'
				isLoading={isLoading}
			/>
			<StatusMessage type='error' message={errorMsg} />
			<StatusMessage type='success' message={successMsg} />

			<div className='mt-8 text-sm text-center text-gray-400'>
				Don't have an account?{' '}
				<button
					type='button'
					className='font-medium text-blue-400 underline transition-colors duration-200 hover:text-blue-300'
					onClick={() => navigate('/auth/sign-up')}
				>
					Sign Up
				</button>
			</div>
		</AuthLayout>
	);
};

export default SignInPage;

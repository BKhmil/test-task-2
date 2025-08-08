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
import type { ISignUpRequest } from '../../interfaces/auth.interface';
import { useSignUpMutation } from '../../store/api/auth.api';
import { userSliceActions } from '../../store/slices/user.slice';

const SignUpPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpRequest>();
	const [signUp, { isLoading }] = useSignUpMutation();
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = async (data: ISignUpRequest) => {
		try {
			setErrorMsg('');
			const response = await signUp(data).unwrap();

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

			dispatch(userSliceActions.setUser({ ...response.user }));

			localStorage.setItem('user', JSON.stringify({ ...response.user }));

			setSuccessMsg('Successfully signed up!');
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
					: 'Sign up failed. Please try again.';
			setErrorMsg(errorMessage);
		}
	};

	const usernameIcon = (
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
				d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
			/>
		</svg>
	);

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

	const signUpIcon = (
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
				d='M12 6v6m0 0v6m0-6h6m-6 0H6'
			/>
		</svg>
	);

	return (
		<AuthLayout
			title='Create Account'
			subtitle='Join our community and start collaborating'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					label='Username'
					icon={usernameIcon}
					register={register('name', {
						required: 'Name is required',
						minLength: {
							value: 3,
							message: 'Username must be at least 3 characters',
						},
						maxLength: {
							value: 20,
							message: 'Username must be less than 20 characters',
						},
						pattern: {
							value: /^[a-zA-Z0-9_]+$/,
							message:
								'Username can only contain letters, numbers, and underscores',
						},
					})}
					error={errors.name}
					type='text'
					placeholder='Enter your username'
				/>

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
					loadingText='Creating Account...'
					icon={signUpIcon}
				>
					Create Account
				</AuthButton>
			</form>

			<StatusMessage
				type='loading'
				message='Creating your account...'
				isLoading={isLoading}
			/>
			<StatusMessage type='error' message={errorMsg} />
			<StatusMessage type='success' message={successMsg} />

			<div className='text-center mt-8 text-gray-400 text-sm'>
				Already have an account?{' '}
				<button
					type='button'
					className='text-blue-400 hover:text-blue-300 font-medium underline transition-colors duration-200'
					onClick={() => navigate('/auth/sign-in')}
				>
					Sign In
				</button>
			</div>
		</AuthLayout>
	);
};

export default SignUpPage;

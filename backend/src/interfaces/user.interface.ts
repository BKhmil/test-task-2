import { ITokenPair } from './token.interface';

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
}

export type IUserResponseDto = Pick<IUser, 'id' | 'name' | 'email'>;

export type ISignUpRequestDto = Pick<IUser, 'email' | 'password' | 'name'>;

export type ISignInRequestDto = Pick<IUser, 'email' | 'password'>;

export type ISignInResponseDto = {
	user: IUserResponseDto;
	tokens: ITokenPair;
};

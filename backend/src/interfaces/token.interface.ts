export interface IToken {
	id: number;
	accessToken: string;
	refreshToken: string;
	userId: number;
}

export interface ITokenPayload {
	userId: number;
	name: string;
}

export type ITokenPair = Pick<IToken, 'accessToken' | 'refreshToken'>;

import { ApiError } from '../errors/api.error';
import { ITokenPair, ITokenPayload } from '../interfaces/token.interface';
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
} from '../interfaces/user.interface';
import { userPresenter } from '../presenters/user.presenter';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';
import { tokenService } from './token.service';

class AuthService {
	public async signUp(dto: ISignUpRequestDto): Promise<ISignInResponseDto> {
		const password = await passwordService.hashPassword(dto.password);
		const user = await userRepository.create({
			...dto,
			password,
		});

		const tokens = await this.generateAndStoreTokens({
			userId: user.id,
			name: user.name,
		});

		return { user: userPresenter.toResponse(user), tokens };
	}

	public async signIn(dto: ISignInRequestDto): Promise<ISignInResponseDto> {
		const user = await userRepository.getByEmail(dto.email);

		await this.isPasswordCorrectOrThrow(dto.password, user.password);

		const tokens = await this.generateAndStoreTokens({
			userId: user.id,
			name: user.name,
		});

		return { user: userPresenter.toResponse(user), tokens };
	}

	public async refresh(
		tokenPayload: ITokenPayload,
		refreshToken: string,
	): Promise<ITokenPair> {
		await tokenRepository.deleteOneByParams({ refreshToken });
		const tokens = await this.generateAndStoreTokens({
			userId: tokenPayload.userId,
			name: tokenPayload.name,
		});
		return tokens;
	}

	public async logout(
		accessToken: string,
		payload: ITokenPayload,
	): Promise<void> {
		await tokenRepository.deleteOneByParams({ accessToken });
		void userRepository.getById(payload.userId);
	}

	public async logoutAll(payload: ITokenPayload): Promise<void> {
		await tokenRepository.deleteManyByParams({ userId: payload.userId });
		void userRepository.getById(payload.userId);
	}

	private async generateAndStoreTokens(
		payload: ITokenPayload,
	): Promise<ITokenPair> {
		const tokens = tokenService.generateTokens(payload);
		await tokenRepository.create({ ...tokens, userId: payload.userId });
		return tokens;
	}

	private async isPasswordCorrectOrThrow(
		passwordFromUser: string,
		passwordStoredInDB: string,
	): Promise<void> {
		const flag = await passwordService.comparePassword(
			passwordFromUser,
			passwordStoredInDB,
		);

		if (!flag) {
			throw new ApiError('Invalid credentials', 401);
		}
	}
}

export const authService = new AuthService();

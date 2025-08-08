import { IToken } from '../interfaces/token.interface';
import { Token } from '../models';

class TokenRepository {
	async create(tokenData: Partial<IToken>): Promise<IToken> {
		return await Token.create(tokenData);
	}

	async findByParams(params: Partial<IToken>): Promise<IToken | null> {
		return await Token.findOne({ where: params });
	}

	async deleteOneByParams(params: Partial<IToken>): Promise<void> {
		const token = await Token.findOne({ where: params });

		await token.destroy();
	}

	async deleteManyByParams(params: Partial<IToken>): Promise<void> {
		await Token.destroy({ where: params });
	}
}

export const tokenRepository = new TokenRepository();

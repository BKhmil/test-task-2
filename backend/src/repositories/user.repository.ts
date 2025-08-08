import { ISignUpRequestDto, IUser } from '../interfaces/user.interface';
import { User } from '../models';

class UserRepository {
	async create(userData: ISignUpRequestDto): Promise<IUser> {
		return await User.create(userData);
	}

	async getByEmail(email: string): Promise<IUser | null> {
		return await User.scope('withPassword').findOne({ where: { email } });
	}

	async getById(id: number): Promise<IUser | null> {
		return await User.findByPk(id);
	}

	async delete(id: number): Promise<void> {
		await User.destroy({ where: { id } });
	}
}

export const userRepository = new UserRepository();

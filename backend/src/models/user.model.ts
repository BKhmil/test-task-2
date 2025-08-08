import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';
import { IUser } from '../interfaces/user.interface';

export class User extends Model<IUser> {
	declare id: number;
	declare name: string;
	declare email: string;
	declare password: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		defaultScope: {
			attributes: { exclude: ['password'] },
		},
		scopes: {
			withPassword: {
				attributes: { exclude: [] }, // for password check
			},
		},
	},
);

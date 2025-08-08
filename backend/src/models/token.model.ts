import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';
import { IToken } from '../interfaces/token.interface';

export class Token extends Model<IToken> {
	declare id: number;
	declare accessToken: string;
	declare refreshToken: string;
	declare userId: number;
}

Token.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		accessToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Token',
		tableName: 'tokens',
	},
);

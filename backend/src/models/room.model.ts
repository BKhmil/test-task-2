import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';
import { IRoom } from '../interfaces/room.interface';

export class Room extends Model<IRoom> {
	declare id: number;
	declare name: string;
	declare description?: string;
	declare createdBy: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Room.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'Room',
		tableName: 'rooms',
		timestamps: true,
	},
);

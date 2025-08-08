import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';
import { ERoomUserRole } from '../enums/room-user-role.enum';
import { IRoomUser } from '../interfaces/room-user.interface';

export class RoomUser extends Model<IRoomUser> {
	declare id: number;
	declare roomId: number;
	declare userId: number;
	declare role: ERoomUserRole;
}

RoomUser.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		roomId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(...Object.values(ERoomUserRole)),
			allowNull: false,
			defaultValue: ERoomUserRole.USER,
		},
	},
	{
		sequelize,
		modelName: 'RoomUser',
		tableName: 'room_users',
		indexes: [
			{
				unique: true,
				fields: ['roomId', 'userId'],
			},
		],
	},
);

import { RoomUser as RoomUserModel } from './room-user.model';
import { Room as RoomModel } from './room.model';
import { Token as TokenModel } from './token.model';
import { User as UserModel } from './user.model';

UserModel.hasMany(TokenModel, { foreignKey: 'userId', as: 'tokens' });
TokenModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

RoomModel.belongsTo(UserModel, { foreignKey: 'createdBy', as: 'creator' });
UserModel.hasMany(RoomModel, { foreignKey: 'createdBy', as: 'createdRooms' });

UserModel.belongsToMany(RoomModel, {
	through: RoomUserModel,
	foreignKey: 'userId',
	otherKey: 'roomId',
	as: 'rooms',
});
RoomModel.belongsToMany(UserModel, {
	through: RoomUserModel,
	foreignKey: 'roomId',
	otherKey: 'userId',
	as: 'users',
});

RoomUserModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserModel.hasMany(RoomUserModel, { foreignKey: 'userId', as: 'roomUsers' });

RoomUserModel.belongsTo(RoomModel, { foreignKey: 'roomId', as: 'room' });
RoomModel.hasMany(RoomUserModel, { foreignKey: 'roomId', as: 'roomUsers' });

export {
	RoomModel as Room,
	RoomUserModel as RoomUser,
	TokenModel as Token,
	UserModel as User,
};

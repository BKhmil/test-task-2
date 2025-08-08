import joi from 'joi';
import { ERoomUserRole } from '../enums/room-user-role.enum';

export class RoomUserValidator {
	private static roomId = joi.number().integer().positive();
	private static userId = joi.number().integer().positive();
	private static userEmail = joi.string().email().trim();
	private static role = joi.string().valid(...Object.values(ERoomUserRole));

	public static addUserToRoom = joi.object({
		roomId: this.roomId.required(),
		userEmail: this.userEmail.required(),
		role: this.role.required(),
	});

	public static removeUserFromRoom = joi.object({
		roomId: this.roomId.required(),
		userId: this.userId.required(),
	});

	public static updateUserRole = joi.object({
		roomId: this.roomId.required(),
		userId: this.userId.required(),
		role: this.role.required(),
	});
}

import joi from 'joi';

export class RoomValidator {
	private static name = joi.string().min(1).max(100).trim();
	private static description = joi.string().max(500).trim();

	public static create = joi.object({
		name: this.name.required(),
		description: this.description.optional(),
	});

	public static update = joi.object({
		name: this.name.optional(),
		description: this.description.optional(),
	});

	public static getListQuery = joi.object({
		page: joi.number().integer().min(1).default(1),
		limit: joi.number().integer().min(1).max(100).default(10),
	});
}

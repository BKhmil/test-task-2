import joi from 'joi';

import { regexConstant } from '../constants/regex.constant';

export class UserValidator {
	private static name = joi.string().min(3).max(50).trim();
	private static email = joi.string().pattern(regexConstant.EMAIL).trim();
	private static password = joi.string().pattern(regexConstant.PASSWORD).trim();

	public static signUp = joi.object({
		email: this.email.required(),
		password: this.password.required(),
		name: this.name.required(),
	});

	public static signIn = joi.object({
		email: this.email.required(),
		password: this.password.required(),
	});
}

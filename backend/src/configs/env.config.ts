import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
	APP_PORT: process.env.APP_PORT,
	APP_HOST: process.env.APP_HOST,

	APP_FRONT_URL: process.env.APP_FRONT_URL,

	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
};

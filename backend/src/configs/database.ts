import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: process.env.DB_PATH || './database.sqlite',
	logging: false,
});

export default sequelize;

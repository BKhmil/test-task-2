import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import sequelize from './configs/database';
import { envConfig } from './configs/env.config';
import { ApiError } from './errors/api.error';
import { apiRouter } from './routers/api.router';

const app = express();

app.use(cors({ origin: envConfig.APP_FRONT_URL || 'http://localhost:80' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	console.log("PATH", req.url);
	console.log("METHOD", req.method);
	next();
});
app.use('/api', apiRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof ApiError) {
		res.status(error.status).json({ message: error.message });
	} else {
		res.status(500).json({ message: 'Server error' });
	}
});

process.on('uncaughtException', (error) => {
	process.exit(1);
});

app.listen(envConfig.APP_PORT, async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('DB connected!');
		console.log(`Server is running on port ${envConfig.APP_PORT}`);
	} catch (error) {
		process.exit(1);
	}
});

import { Router } from 'express';
import { roomsController } from '../controllers/rooms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { commonMiddleware } from '../middlewares/common.middleware';
import { RoomValidator } from '../validators/room.validator';

const router = Router();

router.get(
	'/',
	authMiddleware.checkAccessToken,
	commonMiddleware.validateQuery(RoomValidator.getListQuery),
	roomsController.getList,
);

router.get(
	'/shared',
	authMiddleware.checkAccessToken,
	commonMiddleware.validateQuery(RoomValidator.getListQuery),
	roomsController.getSharedRooms,
);

router.get(
	'/:roomId/users',
	authMiddleware.checkAccessToken,
	roomsController.getRoomUsers,
);

router.get(
	'/:roomId/permissions',
	authMiddleware.checkAccessToken,
	roomsController.getRoomPermissions,
);

router.get('/:id', authMiddleware.checkAccessToken, roomsController.getById);

router.post(
	'/',
	authMiddleware.checkAccessToken,
	commonMiddleware.validateBody(RoomValidator.create),
	roomsController.create,
);

router.post(
	'/:roomId/users',
	authMiddleware.checkAccessToken,
	roomsController.addUserToRoom,
);

router.put(
	'/:id',
	authMiddleware.checkAccessToken,
	commonMiddleware.validateBody(RoomValidator.update),
	roomsController.update,
);

router.delete('/:id', authMiddleware.checkAccessToken, roomsController.delete);

router.delete(
	'/:roomId/users/:userId',
	authMiddleware.checkAccessToken,
	roomsController.removeUserFromRoom,
);

export const roomsRouter = router;

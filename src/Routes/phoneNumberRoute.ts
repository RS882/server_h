import express from 'express';
import { phoneNumberController } from '../Controller/phoheNumberCntroller';
import { ITelNumer } from '../db/db';

export const getPhoneNumberRouter = (db: ITelNumer) => {


	const phoneNumberRouter = express.Router();

	phoneNumberRouter.get('/', (req, res) => phoneNumberController.get(req, res, db));
	phoneNumberRouter.get('/:id', (req, res) => phoneNumberController.get(req, res, db));
	phoneNumberRouter.post('/', phoneNumberController.post);
	phoneNumberRouter.put('/:id', phoneNumberController.put);
	phoneNumberRouter.put('/', phoneNumberController.put);
	phoneNumberRouter.delete('/', phoneNumberController.delete);
	phoneNumberRouter.delete('/:id', phoneNumberController.delete);

	return phoneNumberRouter;

};
	// usersRouter.get('/', (
	// 	req: RequestWithQuery<QueryUserModel>,
	// 	res: Response<APIUserModel[]>) => {
	// 	let foundUsers = db.users;
	// 	if (req.query.userName) { foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName) > -1) }//??????
	// 	res.json(foundUsers.map(getAPIUserModel));

	// });
	// //GET---------------------
	// usersRouter.get('/:id([0-9]+)', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<APIUserModel>) => {
	// 	const foundUser = db.users.find(u => u.id === +req.params.id)
	// 	if (!foundUser) {
	// 		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
	// 		return;
	// 	};
	// 	res.json(getAPIUserModel(foundUser));
	// });
	// //POST---------------------
	// usersRouter.post('/', (req: RequestWithBody<CreateUserModel>, res: Response<APIUserModel>) => {
	// 	if (!req.body.userName || req.body.userName!.split('').filter((e) => e !== ' ').length <= 0) {
	// 		res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
	// 		return;
	// 	};
	// 	const newUser: IUser = {
	// 		id: +(new Date()),
	// 		userName: req.body.userName,
	// 		orderCount: 0,
	// 	};
	// 	db.users.push(newUser);
	// 	res.status(HTTP_STATUSES.CREATED_201).json(getAPIUserModel(newUser));
	// });

	// //DELETE---------------------
	// usersRouter.delete('/:id([0-9]+)', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
	// 	if (!db.users.map(e => e.id).includes(+req.params.id)) {
	// 		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
	// 		return;
	// 	};
	// 	db.users = db.users.filter(u => u.id !== +req.params.id)
	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
	// });
	// //PUT---------------------
	// usersRouter.put('/:id([0-9]+)', (req: RequestWithBodyAndBody<URIParamsUserIdModel, UpdateUserModel>, res) => {
	// 	if (!req.body.userName || req.body.userName!.split('').filter((e) => e !== ' ').length <= 0) {
	// 		res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
	// 		return;
	// 	};
	// 	const foundUser = db.users.find(u => u.id === +req.params.id)
	// 	if (!foundUser) {
	// 		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
	// 		return;
	// 	};
	// 	foundUser.userName = req.body.userName;
	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
	// });


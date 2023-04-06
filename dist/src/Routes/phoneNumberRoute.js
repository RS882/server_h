"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhoneNumberRouter = void 0;
const express_1 = __importDefault(require("express"));
const phoheNumberCntroller_1 = require("../Controller/phoheNumberCntroller");
const getPhoneNumberRouter = () => {
    const phoneNumberRouter = express_1.default.Router();
    phoneNumberRouter.get('/', phoheNumberCntroller_1.phoneNumberController.get);
    phoneNumberRouter.get('/:id', phoheNumberCntroller_1.phoneNumberController.get);
    phoneNumberRouter.post('/', phoheNumberCntroller_1.phoneNumberController.post);
    phoneNumberRouter.put('/:id', phoheNumberCntroller_1.phoneNumberController.put);
    phoneNumberRouter.put('/', phoheNumberCntroller_1.phoneNumberController.put);
    phoneNumberRouter.delete('/', phoheNumberCntroller_1.phoneNumberController.delete);
    phoneNumberRouter.delete('/:id', phoheNumberCntroller_1.phoneNumberController.delete);
    return phoneNumberRouter;
};
exports.getPhoneNumberRouter = getPhoneNumberRouter;
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

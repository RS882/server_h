"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberController = void 0;
const db_1 = require("../db/db");
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const getAPIPhoneNumberModel = (db) => ({
    phoneNumber: db.phoneNumber,
});
const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
exports.phoneNumberController = {
    db: db_1.dbPhoneNumber,
    get: (req, res) => {
        res.json(getAPIPhoneNumberModel(exports.phoneNumberController.db));
    },
    post: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).json(getMethodNotAllowdText('POST'));
    },
    put: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).json(getMethodNotAllowdText('PUT'));
    },
    delete: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).json(getMethodNotAllowdText('DELETE'));
    },
};
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

import { Request, Response } from "express";
import { dbPhoneNumber, ITelNumer } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { APIPhoneNumberModel } from "../models/APIPhoneNumberModel";
import { RequestWithBody, RequestWithBodyAndBody, RequestWithQuery } from "../types";
import { QueryPhoneNumberModel } from './../models/QueryPhoneNumberModel';


const getAPIPhoneNumberModel = (db: ITelNumer): APIPhoneNumberModel => ({
	phoneNumber: db.phoneNumber,
});

const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

export const phoneNumberController = {
	db: dbPhoneNumber,
	get: (req: RequestWithQuery<QueryPhoneNumberModel>,
		res: Response<APIPhoneNumberModel>) => {
		res.json(getAPIPhoneNumberModel(phoneNumberController.db));
	},
	post: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).send(getMethodNotAllowdText('POST'));
	},
	put: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).send(getMethodNotAllowdText('PUT'))
	},
	delete: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).send(getMethodNotAllowdText('DELETE'))
	},
}


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
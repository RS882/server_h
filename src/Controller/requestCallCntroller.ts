import { Request, Response } from "express";
import { API_METHODS } from "../API_Methods/APIMethods";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { RequestWithBody, RequestWithParams, RequestWithQuery } from "../types";
import { getMethodNotAllowdText, isFormatedTelNumberCorrect } from "../Utilite/function";
import { CreateRequestCallModel } from './../models/CreateRequestCall';
import { APIRequestCallModel } from './../models/APIRequestCallModel';
import { IdbRequestCall, IRequestCall } from "../db/db";


const getAPIRequstCallModell = (db: IRequestCall): IRequestCall => ({
	id: db.id,
	userName: db.userName,
	phoneNumber: db.phoneNumber,
})

export const requestCallController = {

	get: (req: Request,
		res: Response<APIRequestCallModel[]>,
		db: IdbRequestCall) => {
		const foundUsers = db.requestCall;
		res.json(foundUsers.map(getAPIRequstCallModell));

	},

	post: (req: RequestWithBody<CreateRequestCallModel>, res: Response<APIRequestCallModel>, db: IdbRequestCall) => {
		if (!req.body.userName ||
			req.body.userName!.split('').filter((e) => e !== ' ').length <= 0 ||
			!isFormatedTelNumberCorrect(req.body.phoneNumber)) {
			res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			return;
		};
		const newRequestCall: IRequestCall = {
			id: db.requestCall.length > 0 ? db.requestCall.length + 1 : 1,
			userName: req.body.userName,
			phoneNumber: req.body.phoneNumber,
		};
		db.requestCall.push(newRequestCall);
		res.status(HTTP_STATUSES.CREATED_201).json(getAPIRequstCallModell(newRequestCall));

	},
	put: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT));
	},
	delete: (req: Request, res: Response, db: IdbRequestCall) => {
		if (!db.requestCall.map(e => e.id).includes(+req.params.id)) {
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		};
		db.requestCall = db.requestCall.filter(u => u.id !== +req.params.id)
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
	},
};
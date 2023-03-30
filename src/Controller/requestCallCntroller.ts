import { Request, Response } from "express";
import { API_METHODS } from "../API_Methods/APIMethods";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { RequestWithBody } from "../types";
import { getMethodNotAllowdText, isFormatedTelNumberCorrect } from "../Utilite/function";
import { CreateRequestCallModel } from './../models/CreateRequestCall';
import { APIRequestCallModel } from './../models/APIRequestCallModel';
import { IdbRequestCall, IRequestCall } from "../db/db";




class RequestCallController {


	_getAPIRequstCallModell = (db: IRequestCall): IRequestCall => ({
		id: db.id,
		userName: db.userName,
		phoneNumber: db.phoneNumber,
	})

	get = (db: IdbRequestCall) =>
		async (req: Request,
			res: Response<APIRequestCallModel[]>) => {
			const foundUsers = db.requestCall;
			res.json(foundUsers.map(this._getAPIRequstCallModell));

		};

	post = (db: IdbRequestCall) =>
		async (req: RequestWithBody<CreateRequestCallModel>,
			res: Response<APIRequestCallModel>) => {
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
			res.status(HTTP_STATUSES.CREATED_201).json(this._getAPIRequstCallModell(newRequestCall));

		};
	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT));
	};
	delete = (db: IdbRequestCall) =>
		async (req: Request, res: Response) => {
			if (!db.requestCall.map(e => e.id).includes(+req.params.id)) {
				res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
				return;
			};
			db.requestCall = db.requestCall.filter(u => u.id !== +req.params.id)
			res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
		}
};

export const requestCallController = new RequestCallController();
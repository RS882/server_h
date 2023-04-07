import { Request, Response } from "express";
import { API_METHODS } from "../API_Methods/APIMethods";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { RequestWithBody, RequestWithParams } from "../types";
import { getMethodNotAllowdText, isFormatedTelNumberCorrect } from "../Utilite/function";
import { APIRequestCallModel } from "../models/APIModels/APIRequestCallModel";
import { APINotAllowMethodModel } from "../models/APIModels/APINotAllowMethodModel";
import { URIParamsRequestCallIdModel } from "../models/URIParamsUserIdModel";
import { requestCallService } from "../service/requestCallService";


class RequestCallController {


	get = async (req: RequestWithParams<URIParamsRequestCallIdModel>,
		res: Response<APIRequestCallModel[] | APIRequestCallModel>) => {
		const foundRequestCall = await requestCallService.get(req.params);
		if (!foundRequestCall || foundRequestCall.length === 0) {
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		};
		if (req.params.id && foundRequestCall.length !== 0) {
			res.json(foundRequestCall[0]);
			return;
		};
		res.json(foundRequestCall);
	};


	post = async (req: RequestWithBody<APIRequestCallModel>,
		res: Response<APIRequestCallModel>) => {
		if (!req.body.userName ||
			req.body.userName!.split('').filter((e) => e !== ' ').length <= 0 ||
			!isFormatedTelNumberCorrect(req.body.phoneNumber)) {
			res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			return;
		};
		const savedRequestCall = await requestCallService.post(req.body);
		if (!savedRequestCall || savedRequestCall.length === 0) {
			res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
			return;
		};
		res.status(HTTP_STATUSES.CREATED_201).json(savedRequestCall[0]);
	};

	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT));
	};

	delete = async (req: RequestWithParams<URIParamsRequestCallIdModel>, res: Response) => {
		const isRequestCallDeleted: boolean = await requestCallService.delete(req.params);
		res.sendStatus(
			isRequestCallDeleted ?
				HTTP_STATUSES.NO_CONTENT_204 :
				HTTP_STATUSES.NOT_FOUND_404
		);
	}
};

export const requestCallController = new RequestCallController();

// class RequestCallController {


// 	_getAPIRequstCallModell = (db: IRequestCall): IRequestCall => ({
// 		id: db.id,
// 		userName: db.userName,
// 		phoneNumber: db.phoneNumber,
// 	})

// 	get = (db: IdbRequestCall) =>
// 		async (req: Request,
// 			res: Response<APIRequestCallModel[]>) => {
// 			const foundUsers = db.requestCall;
// 			res.json(foundUsers.map(this._getAPIRequstCallModell));

// 		};

// 	post = (db: IdbRequestCall) =>
// 		async (req: RequestWithBody<CreateRequestCallModel>,
// 			res: Response<APIRequestCallModel>) => {
// 			if (!req.body.userName ||
// 				req.body.userName!.split('').filter((e) => e !== ' ').length <= 0 ||
// 				!isFormatedTelNumberCorrect(req.body.phoneNumber)) {
// 				res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
// 				return;
// 			};
// 			const newRequestCall: IRequestCall = {
// 				id: db.requestCall.length > 0 ? db.requestCall.length + 1 : 1,
// 				userName: req.body.userName,
// 				phoneNumber: req.body.phoneNumber,
// 			};
// 			db.requestCall.push(newRequestCall);
// 			res.status(HTTP_STATUSES.CREATED_201).json(this._getAPIRequstCallModell(newRequestCall));

// 		};
// 	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
// 		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT));
// 	};
// 	delete = (db: IdbRequestCall) =>
// 		async (req: Request<URIParamsRequestCallIdModel>, res: Response) => {
// 			if (!db.requestCall.map(e => e.id).includes(+req.params.id)) {
// 				res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
// 				return;
// 			};
// 			db.requestCall = db.requestCall.filter(u => u.id !== +req.params.id)
// 			res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
// 		}
// };

import { Request, Response } from "express";
import { ITelNumer } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { APIPhoneNumberModel } from "../models/APIPhoneNumberModel";

import { API_METHODS } from './../API_Methods/APIMethods';
import { getMethodNotAllowdText } from "../Utilite/function";


const getAPIPhoneNumberModel = (db: ITelNumer): APIPhoneNumberModel => ({
	phoneNumber: db.phoneNumber,
});



export const phoneNumberController = {

	get: (req: Request,
		res: Response<APIPhoneNumberModel>,
		bd: ITelNumer) => {
		res.json(getAPIPhoneNumberModel(bd));
	},
	post: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.POST));
	},
	put: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT))
	},
	delete: (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.DELETE))
	},
}


import { Request, Response } from "express";
import { dbPhoneNumber, ITelNumer } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { APIPhoneNumberModel } from "../models/APIPhoneNumberModel";
import { RequestWithQuery } from "../types";
import { QueryPhoneNumberModel } from './../models/QueryPhoneNumberModel';
import { API_METHODS } from './../API_Methods/APIMethods';


const getAPIPhoneNumberModel = (db: ITelNumer): APIPhoneNumberModel => ({
	phoneNumber: db.phoneNumber,
});

const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

const dbTNum: ITelNumer = dbPhoneNumber;

export const phoneNumberController = {

	get: (req: RequestWithQuery<QueryPhoneNumberModel>,
		res: Response<APIPhoneNumberModel>) => {
		res.json(getAPIPhoneNumberModel(dbTNum));
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


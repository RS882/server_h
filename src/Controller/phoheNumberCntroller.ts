import { Request, Response } from "express";
import { ITelNumer } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";
import { APIPhoneNumberModel } from "../models/APIPhoneNumberModel";

import { API_METHODS } from './../API_Methods/APIMethods';
import { getMethodNotAllowdText } from "../Utilite/function";



class PhoneNumberController {



	_getAPIPhoneNumberModel = (bd: ITelNumer): APIPhoneNumberModel => ({
		phoneNumber: bd.phoneNumber,
	})

	get = (bd: ITelNumer) =>
		async (req: Request,
			res: Response<APIPhoneNumberModel>) => {
			res.json(this._getAPIPhoneNumberModel(bd));
		}
	post = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.POST));
	}
	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT))
	}
	delete = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.DELETE))
	}

}

export const phoneNumberController = new PhoneNumberController();
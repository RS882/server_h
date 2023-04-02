import { Request, Response } from "express";
import { ITelNumer } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";

import { API_METHODS } from './../API_Methods/APIMethods';
import { getMethodNotAllowdText } from "../Utilite/function";
import { APIPhoneNumberModel } from "../models/APIModels/APIPhoneNumberModel";
import { APINotAllowMethodModel } from "../models/APIModels/APINotAllowMethodModel";
import { phoneNumberService } from './../service/phoneNumberService';



class PhoneNumberController {



	_getAPIPhoneNumberModel = (bd: ITelNumer): APIPhoneNumberModel => ({
		phoneNumber: bd.phoneNumber,
	})

	get = async (req: Request, res: Response<APIPhoneNumberModel>) => {
		const resFromService = await phoneNumberService.get();
		res.json(resFromService);
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
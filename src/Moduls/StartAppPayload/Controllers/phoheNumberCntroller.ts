import { Request, Response } from "express";
import { APIPhoneNumberModel } from './../Models/APIModels/APIPhoneNumberModel';
import { phoneNumberService } from './../Services/phoneNumberService';
import { HTTP_STATUSES } from './../../../HTTP_Status/HTTP_Status';
import { APINotAllowMethodModel } from "../../../models/APIModels/APINotAllowMethodModel";
import { getMethodNotAllowdText } from "../../../Utilite/function";
import { API_METHODS } from "../../../API_Methods/APIMethods";





class PhoneNumberController {


	get = async (req: Request, res: Response<APIPhoneNumberModel>) => {
		try {
			const resFromService = await phoneNumberService.get();
			res.json(resFromService);
		} catch (error) {
			console.log(error);
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		}

	}
	post = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		try {
			res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.POST));
		} catch (error) {
			console.log(error);
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		}

	}
	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		try {
			res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT))
		} catch (error) {
			console.log(error);
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		}


	}
	delete = async (req: Request, res: Response<APINotAllowMethodModel>) => {
		try {
			res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.DELETE))
		} catch (error) {
			console.log(error);
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		}


	}

}

export const phoneNumberController = new PhoneNumberController();
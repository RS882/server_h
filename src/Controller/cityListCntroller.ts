import { Request, Response } from "express";

import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";


import { API_METHODS } from './../API_Methods/APIMethods';
import { APICitysListModel } from "../models/APIModels/APICitysListModel";

import { getMethodNotAllowdText } from "../Utilite/function";
import { APINotAllowMethodModel } from "../models/APIModels/APINotAllowMethodModel";
import { cityListService } from './../service/citysListService';




class CitysListController {


	get = async (req: Request, res: Response<APICitysListModel>) => {
		const resSQL = await cityListService.get();
		res.json(resSQL);
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

export const citysListController = new CitysListController();


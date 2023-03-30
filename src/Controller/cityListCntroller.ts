import { Request, Response } from "express";
import { dbCitysList } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";

import { API_METHODS } from './../API_Methods/APIMethods';
import { APICitysListModel } from "../models/APICitysListModel";
import { ICitysList } from './../db/db';
import { getMethodNotAllowdText } from "../Utilite/function";




class CitysListController {


	_getAPICitysListModel = (db: ICitysList): APICitysListModel => ({ citysList: db.citysList })

	get = (db: ICitysList) =>
		async (req: Request,
			res: Response<APICitysListModel>) => {
			res.json(this._getAPICitysListModel(db));
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


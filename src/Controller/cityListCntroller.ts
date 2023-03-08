import { Request, Response } from "express";
import { dbCitysList } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";

import { API_METHODS } from './../API_Methods/APIMethods';
import { APICitysListModel } from "../models/APICitysListModel";
import { ICitysList } from './../db/db';
import { getMethodNotAllowdText } from "../Utilite/function";


const getAPICitysListModel = (db: ICitysList): APICitysListModel => ({ citysList: db.citysList });



export const citysListController = {

	get: (req: Request,
		res: Response<APICitysListModel>,
		db: ICitysList) => {
		res.json(getAPICitysListModel(db));
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


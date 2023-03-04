import { Request, Response } from "express";
import { cityList, CitysList, dbCitysList } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APINotAllowMethodModel } from "../models/APINotAllowMethodModel";

import { API_METHODS } from './../API_Methods/APIMethods';
import { APICitysListModel } from "../models/APICitysListModel";
import { ICitysList } from './../db/db';


const getAPICitysListModel = (db: ICitysList): APICitysListModel => ({ citysList: db.citysList });

const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

const dbCitys: ICitysList = dbCitysList;

export const citysListController = {

	get: (req: Request,
		res: Response<APICitysListModel>) => {
		res.json(getAPICitysListModel(dbCitys));
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


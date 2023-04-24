import { NextFunction, Request, Response } from "express";
import { APIUserLoginModel } from './../Models/APIModels/APIUserLoginModel';
import { LinkParamsModel } from './../Models/LinkParamsModel';
import { RequestWithBody, RequestWithParams } from "../../../types";

export type ControllerMethod<T = Request> = (req: T, res: Response, next: NextFunction) => Promise<void>;


export interface IUserAuthController {

	registration: ControllerMethod<RequestWithBody<APIUserLoginModel>>;
	login: ControllerMethod<RequestWithBody<APIUserLoginModel>>;
	logout: ControllerMethod;
	activate: ControllerMethod<RequestWithParams<LinkParamsModel>>;
	refresh: ControllerMethod;
	users: ControllerMethod;

};

import { NextFunction, Response } from "express";
import { RequestWithBody, RequestWithParams } from "../../../types";
import { APIUserLoginModel } from "../Models/APIModels/APIUserLoginModel";
import { APIUserModel } from "../Models/APIModels/APIUserRegModel";
import { userService } from "../Services/UserService";
import { HTTP_STATUSES } from "../../../HTTP_Status/HTTP_Status";
import { errorMessage } from "../../../ErrorMessage/errorMessage";
import { validationResult } from 'express-validator';
import { LinkParamsModel } from "../Models/LinkParamsModel";
import { env } from 'process';
import { APIError } from "../../../Exceptions/APIError";
import { TokenModel } from "../Models/TokenModel";
import { ControllerMethod, IUserAuthController } from './userAuthController.d';



class UserAuthController implements IUserAuthController {


	#setStatus201AndUserDataAndCookie = (res: Response, data: APIUserModel) => {
		// передаем в куку рефрештокен , его время жизни,  
		//httpOnly: true и secure: true(для https) - запрет на получение куку из браузера с помощь JS 
		res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			.status(HTTP_STATUSES.CREATED_201).json(data);
	};

	#registrationOrLoginFunc = async (req: RequestWithBody<APIUserLoginModel>, res: Response,
		next: NextFunction,
		func: (data: APIUserLoginModel) => Promise<APIUserModel>): Promise<void> => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) next(APIError.BadRequest(errorMessage.INVALID_CHATACTER, errors.array()));

		const userData: APIUserLoginModel = req.body;
		const data: APIUserModel = await func(userData);

		this.#setStatus201AndUserDataAndCookie(res, data);
	};

	registration: ControllerMethod<RequestWithBody<APIUserLoginModel>> = async (req, res, next) => {
		try {
			await this.#registrationOrLoginFunc(req, res, next, userService.reg);
			return;
		} catch (error) {
			next(error);
		}

	};
	login: ControllerMethod<RequestWithBody<APIUserLoginModel>> = async (req, res, next) => {
		try {
			await this.#registrationOrLoginFunc(req, res, next, userService.login);
			return;
		} catch (error) {
			next(error);
		}

	};
	logout: ControllerMethod = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;

			const token: TokenModel = await userService.logout(refreshToken);


			res.clearCookie('refreshToken');
			res.status(HTTP_STATUSES.OK_200).json(token);
			return;
		} catch (error) {
			next(error);
		}

	};
	activate: ControllerMethod<RequestWithParams<LinkParamsModel>> = async (req, res, next) => {
		try {
			const activeLink: string = req.params.link;
			await userService.aktivate(activeLink);
			res.status(302).redirect(env.CLIENT_URL!)
			return;
		} catch (error) {
			next(error)
		}

	};
	refresh: ControllerMethod = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			const userData: APIUserModel = await userService.refresh(refreshToken);
			this.#setStatus201AndUserDataAndCookie(res, userData);
			return;
		} catch (error) {
			next(error);
		}

	};
	users: ControllerMethod = async (req, res, next) => {
		try {
			const usersData = await userService.getAllUsers();
			res.status(HTTP_STATUSES.OK_200).json(usersData)
		} catch (error) {
			next(error);
		}

	};

};

export const userAuthController = new UserAuthController();
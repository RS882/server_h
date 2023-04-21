
import { NextFunction, Request, Response } from "express";
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


class UserAuthController {

	registration = async (req: RequestWithBody<APIUserLoginModel>, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) next(APIError.BadRequest(errorMessage.INVALID_CHATACTER, errors.array()));

			const reqUserData = req.body;
			// if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(reqUserData.userEmail)) {
			// 	res.status(HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage.INVALID_CHATACTER);
			// 	return;
			// };
			// if (!reqUserData.userPassword || reqUserData.userPassword.includes(' ')) {
			// 	res.status(HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage.INVALID_CHATACTER);
			// 	return;
			// };

			const regData: APIUserModel = await userService.reg(reqUserData);

			// передаем в куку рефрештокен , его время жизни,  
			//httpOnly: true и secure: true(для https) - запрет на получение куку из браузера с помощь JS 
			res.cookie('refreshToken', regData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
				.status(HTTP_STATUSES.CREATED_201).json(regData);
			return;

		} catch (error) {
			// console.log(error);
			// if (error.message.includes(`The user with email`)) {
			// 	res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(error.message);
			// 	return;

			// } else {
			// 	res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
			// 	return;
			// }
			next(error);
		}

	};
	login = async (req: RequestWithBody<APIUserLoginModel>, res: Response, next: NextFunction) => {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) next(APIError.BadRequest(errorMessage.INVALID_CHATACTER, errors.array()));

			const logData = req.body;
			const loginData: APIUserModel = await userService.login(logData);

			res.cookie('refreshToken', loginData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
				.status(HTTP_STATUSES.CREATED_201).json(loginData);
			return;

		} catch (error) {
			next(error);
		}

	};
	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			res.status(HTTP_STATUSES.OK_200).json(token);
			return;
		} catch (error) {
			next(error);
		}

	};
	activate = async (req: RequestWithParams<LinkParamsModel>, res: Response, next: NextFunction) => {
		try {
			const activeLink = req.params.link;
			await userService.aktivate(activeLink);
			res.status(302).redirect(env.CLIENT_URL!)
			return;
		} catch (error) {

			next(error)
			// if (error.message === errorMessage.INCORRECT_ACTIVATION_LINK) {
			// 	res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(error.message);
			// 	return;

			// } else {
			// 	res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
			// 	return;
			// }

		}

	};
	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(['refresh'])
		} catch (error) {
			next(error);
		}

	};
	users = async (req: Request, res: Response, next: NextFunction) => {
		try {

			res.json(['2223', '3333'])
		} catch (error) {
			next(error);
		}

	};



};

export const userAuthController = new UserAuthController();
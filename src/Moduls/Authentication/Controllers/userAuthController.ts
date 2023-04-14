
import { NextFunction, Request, Response } from "express";
import { RequestWithBody } from "../../../types";
import { APIUserLoginModel } from "../Models/APIModels/APIUserLoginModel";
import { APIUserRegModel } from "../Models/APIModels/APIUserRegModel";
import { userService } from "../Services/UserService";
import { HTTP_STATUSES } from "../../../HTTP_Status/HTTP_Status";
import { errorMessage } from "../../../ErrorMessage/errorMessage";
import { db } from "../../../db/db";



class UserAuthController {

	registration = async (req: RequestWithBody<APIUserLoginModel>, res: Response, next: NextFunction) => {
		try {

			const reqUserData = req.body;
			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(reqUserData.userEmail)) {
				res.status(HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage.INVALID_CHATACTER);
				return;
			};
			if (!reqUserData.userPassword || reqUserData.userPassword.includes(' ')) {
				res.status(HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage.INVALID_CHATACTER);
				return;
			};

			const regData: APIUserRegModel = await userService.reg(reqUserData);

			// передаем в куку рефрештокен , его время жизни,  
			//httpOnly: true и secure: true(для https) - запрет на получение куку из браузера с помощь JS 
			res.cookie('refreshToken', regData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

			res.status(HTTP_STATUSES.CREATED_201).json(regData);
			return;

		} catch (error: any | unknown) {
			// console.log(error);
			if (error.message.includes(`The user with email`)) {
				res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(error.message);
				return;
			} else {
				res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
				return;
			}

		}

	};
	login = async (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {

		}

	};
	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {

		}

	};
	activate = async (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {

		}

	};
	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {

		}

	};
	users = async (req: Request, res: Response, next: NextFunction) => {
		try {

			res.json(['2223', '3333'])
		} catch (error) {

		}

	};



};

export const userAuthController = new UserAuthController();
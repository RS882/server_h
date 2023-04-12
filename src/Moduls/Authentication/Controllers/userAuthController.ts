import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { RequestWithBody } from "../../../types";
import { APIUserLoginModel } from "../Models/APIUserLoginModel";
import { UserRegModel } from "../Models/UserRegModel";
import { userService } from "../Services/UserService";
import { HTTP_STATUSES } from "../../../HTTP_Status/HTTP_Status";
import { SQLCODE } from "../SQLCode/sqlCode";


class UserAuthController {

	registration = async (req: RequestWithBody<APIUserLoginModel>, res: Response, next: NextFunction) => {
		try {
			const reqUserData = req.body;
			// if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(reqUserData.userEmail)) {
			// 	res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			// 	return;
			// };
			// if (!reqUserData.userPassword||reqUserData.userPassword===' ') {
			// 	res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			// 	return;
			// };
			const regData: UserRegModel = await userService.reg(reqUserData);
			// передаем в куку рефрештокен , его время жизни, 
			//httpOnly: true и secure: true - запрет на получение куку из браузера с помощь JS 
			res.cookie('refreshToken', regData.refreshToken,
				{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			res.status(HTTP_STATUSES.CREATED_201).json(regData);
			return;
		} catch (error) {
			// if (error.code && error.code === SQLCODE.duplicate_key_violates_unique_constraint_23505) {
			// 	res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(`The user with email ${req.body.userEmail} has already been registered`)
			// 	return;
			// }
			console.log(error);
			// res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
			return;
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
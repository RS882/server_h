import { log } from "console";
import { NextFunction, Request, Response } from "express";


class UserAuthController {

	registration = async (req: Request, res: Response, next: NextFunction) => {
		try {

		} catch (error) {

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
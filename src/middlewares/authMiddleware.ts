import { Response, NextFunction, Request } from "express";
import { APIError } from "../Exceptions/APIError";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { errorMessage } from "../ErrorMessage/errorMessage";
import { tokenService } from "../Moduls/Authentication/Services/TokenService";
import { userRepositoty } from "../Moduls/Authentication/Repository/UserRepository";
import { SQLUserAuthModel } from "../Moduls/Authentication/Models/SQLModels/SQLUsweAuthModel";
import { RequestWithBody } from "../types";

const authMiddleware = async (req: RequestWithBody<SQLUserAuthModel>, res: Response, next: NextFunction) => {

	try {
		const authorezation = req.headers.authorization;
		if (!authorezation) next(APIError.UnauthorizedError());
		const accessToken = authorezation?.split(' ')[1];
		if (!accessToken) next(APIError.UnauthorizedError());
		const userData = tokenService.validationAccessToken(accessToken!);
		if (!userData) next(APIError.UnauthorizedError());
		req.body = await userRepositoty.getUserDataById(userData!);
		next();

	} catch (error) {
		return next(APIError.UnauthorizedError())
	}

};

export default authMiddleware;
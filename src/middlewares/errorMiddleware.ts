import { Response, NextFunction } from "express";
import { APIError } from "../Exceptions/APIError";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { errorMessage } from "../ErrorMessage/errorMessage";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	if (err instanceof APIError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors })
	}

	return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({ message: errorMessage.SOME_ERROR })

}
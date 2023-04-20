import { Response, NextFunction, Request } from "express";
import { APIError } from "../Exceptions/APIError";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { errorMessage } from "../ErrorMessage/errorMessage";

const errMiddleware = (err: APIError | Error, req: Request, res: Response, next: NextFunction) => {

	if (err instanceof APIError) {
		// console.log(err.message);
		res.status(err.status).json({ message: err.message, errors: err.errors })
		return;
	}

	res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
		.json({ message: errorMessage.UNFORESEEN_ERROR });

}

export default errMiddleware;
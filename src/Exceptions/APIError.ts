import { errorMessage } from "../ErrorMessage/errorMessage";
import { HTTP_STATUSES } from "../HTTP_Status/HTTP_Status";
import { APIErrorModel } from "../models/APIModels/APIErrorModel";


export class APIError extends Error implements APIErrorModel {
	status;
	errors;
	constructor(status: number, message: string, errors: Error[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	};
	static UnauthorizedError() {
		return new APIError(HTTP_STATUSES.UNAUTHORIZED_401, errorMessage.USER_UNAUTHORIZED);
	};
	static BadRequest(message: string, errors: any = []) {
		return new APIError(HTTP_STATUSES.BAD_REQUEST_400, message, errors);
	};

}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCallController = void 0;
const APIMethods_1 = require("../API_Methods/APIMethods");
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const function_1 = require("../Utilite/function");
const requestCallService_1 = require("../service/requestCallService");
class RequestCallController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const foundRequestCall = yield requestCallService_1.requestCallService.get(req.params);
            if (!foundRequestCall || foundRequestCall.length === 0) {
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
            ;
            if (req.params.id && foundRequestCall.length !== 0) {
                res.json(foundRequestCall[0]);
                return;
            }
            ;
            res.json(foundRequestCall);
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.userName ||
                req.body.userName.split('').filter((e) => e !== ' ').length <= 0 ||
                !(0, function_1.isFormatedTelNumberCorrect)(req.body.phoneNumber)) {
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
                return;
            }
            ;
            const savedRequestCall = yield requestCallService_1.requestCallService.post(req.body);
            if (!savedRequestCall || savedRequestCall.length === 0) {
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
            ;
            res.status(HTTP_Status_1.HTTP_STATUSES.CREATED_201).json(savedRequestCall[0]);
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const isRequestCallDeleted = yield requestCallService_1.requestCallService.delete(req.params);
            res.sendStatus(isRequestCallDeleted ?
                HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204 :
                HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
        });
    }
}
;
exports.requestCallController = new RequestCallController();
// class RequestCallController {
// 	_getAPIRequstCallModell = (db: IRequestCall): IRequestCall => ({
// 		id: db.id,
// 		userName: db.userName,
// 		phoneNumber: db.phoneNumber,
// 	})
// 	get = (db: IdbRequestCall) =>
// 		async (req: Request,
// 			res: Response<APIRequestCallModel[]>) => {
// 			const foundUsers = db.requestCall;
// 			res.json(foundUsers.map(this._getAPIRequstCallModell));
// 		};
// 	post = (db: IdbRequestCall) =>
// 		async (req: RequestWithBody<CreateRequestCallModel>,
// 			res: Response<APIRequestCallModel>) => {
// 			if (!req.body.userName ||
// 				req.body.userName!.split('').filter((e) => e !== ' ').length <= 0 ||
// 				!isFormatedTelNumberCorrect(req.body.phoneNumber)) {
// 				res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
// 				return;
// 			};
// 			const newRequestCall: IRequestCall = {
// 				id: db.requestCall.length > 0 ? db.requestCall.length + 1 : 1,
// 				userName: req.body.userName,
// 				phoneNumber: req.body.phoneNumber,
// 			};
// 			db.requestCall.push(newRequestCall);
// 			res.status(HTTP_STATUSES.CREATED_201).json(this._getAPIRequstCallModell(newRequestCall));
// 		};
// 	put = async (req: Request, res: Response<APINotAllowMethodModel>) => {
// 		res.status(HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(API_METHODS.PUT));
// 	};
// 	delete = (db: IdbRequestCall) =>
// 		async (req: Request<URIParamsRequestCallIdModel>, res: Response) => {
// 			if (!db.requestCall.map(e => e.id).includes(+req.params.id)) {
// 				res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
// 				return;
// 			};
// 			db.requestCall = db.requestCall.filter(u => u.id !== +req.params.id)
// 			res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
// 		}
// };

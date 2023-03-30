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
class RequestCallController {
    constructor() {
        this._getAPIRequstCallModell = (db) => ({
            id: db.id,
            userName: db.userName,
            phoneNumber: db.phoneNumber,
        });
        this.get = (db) => (req, res) => __awaiter(this, void 0, void 0, function* () {
            const foundUsers = db.requestCall;
            res.json(foundUsers.map(this._getAPIRequstCallModell));
        });
        this.post = (db) => (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.userName ||
                req.body.userName.split('').filter((e) => e !== ' ').length <= 0 ||
                !(0, function_1.isFormatedTelNumberCorrect)(req.body.phoneNumber)) {
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
                return;
            }
            ;
            const newRequestCall = {
                id: db.requestCall.length > 0 ? db.requestCall.length + 1 : 1,
                userName: req.body.userName,
                phoneNumber: req.body.phoneNumber,
            };
            db.requestCall.push(newRequestCall);
            res.status(HTTP_Status_1.HTTP_STATUSES.CREATED_201).json(this._getAPIRequstCallModell(newRequestCall));
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
        });
        this.delete = (db) => (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!db.requestCall.map(e => e.id).includes(+req.params.id)) {
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
            ;
            db.requestCall = db.requestCall.filter(u => u.id !== +req.params.id);
            res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
        });
    }
}
;
exports.requestCallController = new RequestCallController();

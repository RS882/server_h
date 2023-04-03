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
exports.citysListController = void 0;
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const APIMethods_1 = require("./../API_Methods/APIMethods");
const function_1 = require("../Utilite/function");
const citysListService_1 = require("./../service/citysListService");
class CitysListController {
    constructor() {
        this._getAPICitysListModel = (db) => ({ citysList: db.citysList });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resSQL = yield citysListService_1.cityListService.get();
            res.json(resSQL);
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.POST));
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.DELETE));
        });
    }
}
exports.citysListController = new CitysListController();

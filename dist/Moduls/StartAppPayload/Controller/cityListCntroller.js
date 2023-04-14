"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citysListController = void 0;
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const APIMethods_1 = require("./../API_Methods/APIMethods");
const function_1 = require("../Utilite/function");
const citysListService_1 = require("./../service/citysListService");
class CitysListController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const resSQL = await citysListService_1.cityListService.get();
                res.json(resSQL);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
        };
        this.post = async (req, res) => {
            try {
                res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.POST));
            }
            catch (error) {
                console.log(error);
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
        };
        this.put = async (req, res) => {
            try {
                res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
            }
            catch (error) {
                console.log(error);
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
        };
        this.delete = async (req, res) => {
            try {
                res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.DELETE));
            }
            catch (error) {
                console.log(error);
                res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
        };
    }
}
exports.citysListController = new CitysListController();

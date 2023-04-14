"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberController = void 0;
const phoneNumberService_1 = require("./../Services/phoneNumberService");
const HTTP_Status_1 = require("./../../../HTTP_Status/HTTP_Status");
const function_1 = require("../../../Utilite/function");
const APIMethods_1 = require("../../../API_Methods/APIMethods");
class PhoneNumberController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const resFromService = await phoneNumberService_1.phoneNumberService.get();
                res.json(resFromService);
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
exports.phoneNumberController = new PhoneNumberController();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberController = void 0;
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const APIMethods_1 = require("./../API_Methods/APIMethods");
const function_1 = require("../Utilite/function");
const getAPIPhoneNumberModel = (db) => ({
    phoneNumber: db.phoneNumber,
});
exports.phoneNumberController = {
    get: (req, res, bd) => {
        res.json(getAPIPhoneNumberModel(bd));
    },
    post: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.POST));
    },
    put: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
    },
    delete: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.DELETE));
    },
};

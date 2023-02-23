"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberController = void 0;
const db_1 = require("../db/db");
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const APIMethods_1 = require("./../API_Methods/APIMethods");
const getAPIPhoneNumberModel = (db) => ({
    phoneNumber: db.phoneNumber,
});
const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
const dbTNum = db_1.dbPhoneNumber;
exports.phoneNumberController = {
    get: (req, res) => {
        res
            // .setHeader('Access-Control-Allow-Origin', '*')
            .json(getAPIPhoneNumberModel(dbTNum));
    },
    post: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(APIMethods_1.API_METHODS.POST));
    },
    put: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    },
    delete: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end(getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCallController = void 0;
const APIMethods_1 = require("../API_Methods/APIMethods");
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const function_1 = require("../Utilite/function");
const getAPIRequstCallModell = (db) => ({
    id: db.id,
    userName: db.userName,
    phoneNumber: db.phoneNumber,
});
exports.requestCallController = {
    get: (req, res, db) => {
        const foundUsers = db.requestCall;
        res.json(foundUsers.map(getAPIRequstCallModell));
    },
    post: (req, res, db) => {
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
        res.status(HTTP_Status_1.HTTP_STATUSES.CREATED_201).json(getAPIRequstCallModell(newRequestCall));
    },
    put: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.PUT));
    },
    delete: (req, res) => {
        res.status(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405).end((0, function_1.getMethodNotAllowdText)(APIMethods_1.API_METHODS.DELETE));
    },
};

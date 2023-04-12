"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthController = void 0;
const UserService_1 = require("../Services/UserService");
const HTTP_Status_1 = require("../../../HTTP_Status/HTTP_Status");
class UserAuthController {
    constructor() {
        this.registration = async (req, res, next) => {
            try {
                const reqUserData = req.body;
                // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(reqUserData.userEmail)) {
                // 	res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
                // 	return;
                // };
                // if (!reqUserData.userPassword||reqUserData.userPassword===' ') {
                // 	res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
                // 	return;
                // };
                const regData = await UserService_1.userService.reg(reqUserData);
                // передаем в куку рефрештокен , его время жизни, 
                //httpOnly: true и secure: true - запрет на получение куку из браузера с помощь JS 
                res.cookie('refreshToken', regData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                res.status(HTTP_Status_1.HTTP_STATUSES.CREATED_201).json(regData);
                return;
            }
            catch (error) {
                // if (error.code && error.code === SQLCODE.duplicate_key_violates_unique_constraint_23505) {
                // 	res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(`The user with email ${req.body.userEmail} has already been registered`)
                // 	return;
                // }
                console.log(error);
                // res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
                return;
            }
        };
        this.login = async (req, res, next) => {
            try {
            }
            catch (error) {
            }
        };
        this.logout = async (req, res, next) => {
            try {
            }
            catch (error) {
            }
        };
        this.activate = async (req, res, next) => {
            try {
            }
            catch (error) {
            }
        };
        this.refresh = async (req, res, next) => {
            try {
            }
            catch (error) {
            }
        };
        this.users = async (req, res, next) => {
            try {
                res.json(['2223', '3333']);
            }
            catch (error) {
            }
        };
    }
}
;
exports.userAuthController = new UserAuthController();

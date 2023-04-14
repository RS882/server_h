"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthController = void 0;
const UserService_1 = require("../Services/UserService");
const HTTP_Status_1 = require("../../../HTTP_Status/HTTP_Status");
const errorMessage_1 = require("../../../ErrorMessage/errorMessage");
class UserAuthController {
    constructor() {
        this.registration = async (req, res, next) => {
            try {
                const reqUserData = req.body;
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(reqUserData.userEmail)) {
                    res.status(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage_1.errorMessage.INVALID_CHATACTER);
                    return;
                }
                ;
                if (!reqUserData.userPassword || reqUserData.userPassword.includes(' ')) {
                    res.status(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400).end(errorMessage_1.errorMessage.INVALID_CHATACTER);
                    return;
                }
                ;
                const regData = await UserService_1.userService.reg(reqUserData);
                // передаем в куку рефрештокен , его время жизни,  
                //httpOnly: true и secure: true(для https) - запрет на получение куку из браузера с помощь JS 
                res.cookie('refreshToken', regData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
                res.status(HTTP_Status_1.HTTP_STATUSES.CREATED_201).json(regData);
                return;
            }
            catch (error) {
                // console.log(error);
                if (error.message.includes(`The user with email`)) {
                    res.status(HTTP_Status_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).end(error.message);
                    return;
                }
                else {
                    res.sendStatus(HTTP_Status_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
                    return;
                }
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

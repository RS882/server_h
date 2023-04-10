"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../Controllers/userAuthController");
const getAuthRouter = () => {
    const authRouter = express_1.default.Router();
    authRouter.post('/registration', userAuthController_1.userAuthController.registration); // регистарция
    authRouter.post('/login', userAuthController_1.userAuthController.login); // логин
    authRouter.post('/logout', userAuthController_1.userAuthController.logout); // логаут - удаления рефреш токена
    authRouter.get('/activate/:link', userAuthController_1.userAuthController.activate); // получения ссылки для активации аккаунта
    authRouter.get('/refresh', userAuthController_1.userAuthController.refresh); // перезапись акссес токена в случае его окончания(получение новой пвры акссес/рефреш)
    authRouter.get('/users', userAuthController_1.userAuthController.users);
    return authRouter;
};
exports.getAuthRouter = getAuthRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const getAuthRouter = () => {
    const authRouter = express_1.default.Router();
    authRouter.post('/registration'); // регистарция
    authRouter.post('/login'); // логин
    authRouter.post('/logout'); // логаут - удаления рефреш токена
    authRouter.get('/activate/:link'); // получения ссылки для активации аккаунта
    authRouter.get('/refresh'); // перезапись акссес токена в случае его окончания(получение новой пвры акссес/рефреш)
    authRouter.get('/users');
    return authRouter;
};
exports.getAuthRouter = getAuthRouter;

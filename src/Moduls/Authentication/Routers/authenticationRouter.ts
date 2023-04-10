import express from 'express';
import { userAuthController } from '../Controllers/userAuthController';





export const getAuthRouter = () => {

	const authRouter = express.Router();

	authRouter.post('/registration', userAuthController.registration);// регистарция
	authRouter.post('/login', userAuthController.login);// логин
	authRouter.post('/logout', userAuthController.logout);// логаут - удаления рефреш токена
	authRouter.get('/activate/:link', userAuthController.activate);// получения ссылки для активации аккаунта
	authRouter.get('/refresh', userAuthController.refresh);// перезапись акссес токена в случае его окончания(получение новой пвры акссес/рефреш)
	authRouter.get('/users', userAuthController.users);
	return authRouter;
}
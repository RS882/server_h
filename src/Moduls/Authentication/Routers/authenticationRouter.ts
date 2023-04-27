import express from 'express';
import { userAuthController } from '../Controllers/userAuthController';
import { body } from 'express-validator';
import authMiddleware from '../../../middlewares/authMiddleware';






export const getAuthRouter = () => {

	const authRouter = express.Router();

	const getPasswordValidator = () => body('userPassword')
		.isLength({ min: 3, max: 32 })
		.custom((value: string) => value && !value.includes(' '));

	const getEmailValidator = () => body('userEmail').isEmail();


	authRouter.post('/registration',
		getEmailValidator(),
		getPasswordValidator(),
		userAuthController.registration);// регистарция

	authRouter.post('/login',
		getEmailValidator(),
		getPasswordValidator(),
		userAuthController.login);// логин

	authRouter.post('/logout', userAuthController.logout);// логаут - удаления рефреш токена
	authRouter.get('/activate/:link', userAuthController.activate);// получения ссылки для активации аккаунта
	authRouter.get('/refresh', userAuthController.refresh);// перезапись акссес токена в случае его окончания(получение новой пвры акссес/рефреш)
	authRouter.get('/users', authMiddleware, userAuthController.users);
	return authRouter;
}
import express from 'express';

import { requestCallController } from '../Controllers/requestCallCntroller';
import { body, param } from 'express-validator';
import { isFormatedTelNumberCorrect } from '../../../Utilite/function';




export const getRequestCallRouter = () => {


	const requsestCallRouter = express.Router();

	requsestCallRouter.get('/', requestCallController.get);
	requsestCallRouter.get('/:id([0-9]+)', requestCallController.get);
	requsestCallRouter.post('/',
		body('userName').custom((value: string) =>
			value && !(value.split('').filter((e: string) => e !== ' ').length <= 0)),
		body('phoneNumber').custom((value: string) => isFormatedTelNumberCorrect(value)),
		requestCallController.post);
	requsestCallRouter.put('/:id', requestCallController.put);
	requsestCallRouter.put('/', requestCallController.put);
	requsestCallRouter.delete('/:id([0-9]+)', requestCallController.delete);

	return requsestCallRouter;


};
import express from 'express';

import { requestCallController } from '../Controller/requestCallCntroller';
import { IdbRequestCall } from '../db/types';



export const getRequestCallRouter = () => {


	const requsestCallRouter = express.Router();

	requsestCallRouter.get('/', requestCallController.get);
	requsestCallRouter.get('/:id([0-9]+)', requestCallController.get);
	requsestCallRouter.post('/', requestCallController.post);
	requsestCallRouter.put('/:id([0-9]+)', requestCallController.put);
	requsestCallRouter.put('/', requestCallController.put);
	requsestCallRouter.delete('/:id([0-9]+)', requestCallController.delete);

	return requsestCallRouter;

};
import express from 'express';

import { requestCallController } from '../Controller/requestCallCntroller';
import { IdbRequestCall } from './../db/db';



export const getRequestCallRouter = (db: IdbRequestCall) => {


	const requsestCallRouter = express.Router();

	requsestCallRouter.get('/', requestCallController.get(db));
	requsestCallRouter.get('/:id', requestCallController.get(db));
	requsestCallRouter.post('/', requestCallController.post(db));
	requsestCallRouter.put('/:id', requestCallController.put);
	requsestCallRouter.put('/', requestCallController.put);
	requsestCallRouter.delete('/:id([0-9]+)', requestCallController.delete(db));

	return requsestCallRouter;

};
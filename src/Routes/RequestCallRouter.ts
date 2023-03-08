import express from 'express';

import { requestCallController } from '../Controller/requestCallCntroller';
import { IdbRequestCall } from './../db/db';



export const getRequestCallRouter = (db: IdbRequestCall) => {


	const requsestCallRouter = express.Router();

	requsestCallRouter.get('/', (req, res) => requestCallController.get(req, res, db));
	requsestCallRouter.get('/:id', (req, res) => requestCallController.get(req, res, db));
	requsestCallRouter.post('/', (req, res) => requestCallController.post(req, res, db));
	requsestCallRouter.put('/:id', requestCallController.put);
	requsestCallRouter.put('/', requestCallController.put);
	requsestCallRouter.delete('/:id([0-9]+)', (req, res) => requestCallController.delete(req, res, db));

	return requsestCallRouter;

};
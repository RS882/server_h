
import express from 'express';
import { ITelNumer } from '../db/db';

import { HTTP_STATUSES } from '../HTTP_Status/HTTP_Status';

export const getTestsRouter = (db: ITelNumer) => {
	const testRouter = express.Router();

	//----------------- только для тестов
	testRouter.delete('/data', (req, res) => {
		db.phoneNumber = '';
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});

	//-----------
	return testRouter;

};
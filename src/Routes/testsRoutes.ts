
import express from 'express';
import { cityList, CitysList, ITelNumer } from '../db/db';

import { HTTP_STATUSES } from '../HTTP_Status/HTTP_Status';
import { ICitysList } from './../db/db';

export const getTestsRouter = (dbTel: ITelNumer, dbCity: ICitysList) => {
	const testRouter = express.Router();

	//----------------- только для тестов
	testRouter.delete('/data', (req, res) => {
		dbTel.phoneNumber = '';

		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});

	testRouter.delete('/city', (req, res) => {
		dbCity.citysList = [];
		console.log(cityList);

		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});
	//-----------
	return testRouter;

};
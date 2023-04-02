
import express from 'express';


import { HTTP_STATUSES } from '../HTTP_Status/HTTP_Status';
import { ICitysList, IdbRequestCall } from '../db/types';
import { db } from '../db/db';



export const getTestsRouter = (dbCity: ICitysList, dbCall: IdbRequestCall) => {

	const testRouter = express.Router();

	//----------------- только для тестов
	// testRouter.post('/data', async (req, res) => {

	// 	const createTestDb = await db.query(`CREATE TABLE tel_number_test AS TABLE tel_number;`);
	// 	const cleareDb = await db.query(`TRUNCATE tel_number;`);
	// 	const addTestDataToDb =
	// 		await db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);


	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	// });
	// testRouter.delete('/data', async (req, res) => {

	// 	const delDb = await db.query(`DROP TABLE IF EXISTS tel_number;`);
	// 	const renameTestDb = await db.query(`ALTER TABLE tel_number_test RENAME TO tel_number;`);

	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	// });

	testRouter.delete('/city', (req, res) => {
		dbCity.citysList = [];
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});
	testRouter.delete('/call', (req, res) => {
		dbCall.requestCall = [];
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});
	//-----------
	return testRouter;
	// testRouter.delete('/data', (req, res) => {
	// 	dbTel.phoneNumber = '';
	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	// });

	// testRouter.delete('/city', (req, res) => {
	// 	dbCity.citysList = [];
	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	// });
	// testRouter.delete('/call', (req, res) => {
	// 	dbCall.requestCall = [];
	// 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	// });
	// //-----------
	// return testRouter;

};
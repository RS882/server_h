"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const getTestsRouter = (dbCall) => {
    const testRouter = express_1.default.Router();
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
    // testRouter.delete('/city', (req, res) => {
    // 	dbCity.citysList = [];
    // 	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    // });
    testRouter.delete('/call', (req, res) => {
        dbCall.requestCall = [];
        res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
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
exports.getTestsRouter = getTestsRouter;

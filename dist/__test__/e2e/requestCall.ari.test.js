"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const APIMethods_1 = require("../../API_Methods/APIMethods");
const app_1 = require("../../app");
const db_1 = require("../../db/db");
const HTTP_Status_1 = require("../../HTTP_Status/HTTP_Status");
describe('/request_call', () => {
    beforeAll(async () => {
        const renameDBBeforTest = await db_1.db.query(`ALTER TABLE request_call RENAME TO request_call_test;`);
        const cleateTestDb = await db_1.db.query(`create TABLE request_call(
				id SERIAL PRIMARY KEY,
				user_name VARCHAR(255),
				tel_number VARCHAR(12),
				is_not_processed BOOLEAN
				);`);
    });
    afterAll(async () => {
        const delTestDb = await db_1.db.query(`DROP TABLE IF EXISTS request_call;`);
        const renameDb = await db_1.db.query(`ALTER TABLE request_call_test RENAME TO request_call;`);
    });
    //========================================
    const postAndGetTestData = async (testData) => {
        await (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(testData)
            .expect(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
        await (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
    };
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    //---------------------------------------
    it('GET :should return 200 and specified data', async () => {
        const testData = {
            userName: 'Test User',
            phoneNumber: '012345678901',
        };
        const addTestDataToDb = await db_1.db.query(`INSERT INTO request_call(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) ;`, [testData.userName, testData.phoneNumber]);
        const getData = await (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200);
        const getDataBody = getData.body;
        expect(getDataBody).toEqual([Object.assign({ id: expect.any(Number) }, testData)]);
        const cleareDb = await db_1.db.query(`TRUNCATE request_call;`);
    });
    it('GET :should return 404 if there is no data', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    it('GET :should return 404 when there is intcorrect URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get('/request_call/iwuu180')
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    it('GET :should return 200 and specified data when there is correct URI parameter', async () => {
        const testData = {
            userName: 'Test User',
            phoneNumber: '012345678901',
        };
        const addTestDataToDb = await db_1.db.query(`INSERT INTO request_call(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) RETURNING id;`, [testData.userName, testData.phoneNumber]);
        const createdDataId = addTestDataToDb.rows[0].id;
        const getData = await (0, supertest_1.default)(app_1.app)
            .get(`/request_call/${createdDataId}`)
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200);
        const getDataBody = getData.body;
        expect(getDataBody).toEqual(Object.assign({ id: createdDataId }, testData));
        const cleareDb = await db_1.db.query(`TRUNCATE request_call;`);
    });
    it('PUT: should return 405 when PUT used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('PUT:should return 405 when PUT used  when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/request_call/ksksjsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('POST: should`nt request call with intcorrect name ', async () => {
        let testData = { userName: '', phoneNumber: '123456789011' };
        await postAndGetTestData(testData);
        testData.userName = ' ';
        await postAndGetTestData(testData);
    });
    it('POST: should`nt request call with intcorrect phone number', async () => {
        const testData = { userName: 'John', phoneNumber: '128r98771' };
        await postAndGetTestData(testData);
    });
    it('POST: should return 500 if it is not possible to create a record on the server', async () => {
        const delDbForTest = await db_1.db.query(`DROP TABLE IF EXISTS request_call;`);
        const testData = { userName: 'John', phoneNumber: '012012012012' };
        await (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(testData)
            .expect(HTTP_Status_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        const cleateTestDb = await db_1.db.query(`create TABLE request_call(
					id SERIAL PRIMARY KEY,
					user_name VARCHAR(255),
					tel_number VARCHAR(12),
					is_not_processed BOOLEAN
					);`);
    });
    it('POST: should request call with correct data', async () => {
        const testData = {
            userName: 'Test User',
            phoneNumber: '012345678901',
        };
        const createData = await (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(testData)
            .expect(HTTP_Status_1.HTTP_STATUSES.CREATED_201);
        const createdDataBody = createData.body;
        expect(createdDataBody).toEqual(Object.assign({}, testData));
        const cleareDb = await db_1.db.query(`TRUNCATE request_call;`);
    });
    it('DELETE :should return 404 when there is intcorrect URI parameter', async () => {
        const getData1 = await (0, supertest_1.default)(app_1.app)
            .delete('/request_call/iwuu180')
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
        const getData2 = await (0, supertest_1.default)(app_1.app)
            .delete('/request_call/33')
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    it('DELETE :should return 204 when there is correct URI parameter', async () => {
        const testData = {
            userName: 'Test User',
            phoneNumber: '012345678901',
        };
        const addTestDataToDb = await db_1.db.query(`INSERT INTO request_call(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) RETURNING id;`, [testData.userName, testData.phoneNumber]);
        const createdDataId = addTestDataToDb.rows[0].id;
        const deleteData = await (0, supertest_1.default)(app_1.app)
            .delete(`/request_call/${createdDataId}`)
            .expect(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
        const cleareDb = await db_1.db.query(`TRUNCATE request_call;`);
    });
});
// it('should return 200 and an empty array when there is any URI parameter', async () => {
// 	await request(app)
// 		.get('/request_call/8sjsj2ha99asj')
// 		.expect(HTTP_STATUSES.OK_200, [])
// });
// it('should`nt user with intcorrect name', async () => {
// 	const date: CreateRequestCallModel = { userName: '', phoneNumber: '123456789011' };
// 	await request(app)
// 		.post('/request_call')
// 		.send(date)
// 		.expect(HTTP_STATUSES.BAD_REQUEST_400);
// 	await request(app)
// 		.get('/request_call')
// 		.expect(HTTP_STATUSES.OK_200, [])
// });
// it('should`nt user with intcorrect phone nummber', async () => {
// 	const date: CreateRequestCallModel = { userName: 'Jhon', phoneNumber: '12345ssd6789011' };
// 	await request(app)
// 		.post('/request_call')
// 		.send(date)
// 		.expect(HTTP_STATUSES.BAD_REQUEST_400);
// 	await request(app)
// 		.get('/request_call')
// 		.expect(HTTP_STATUSES.OK_200, [])
// });
// it('should`nt user with intcorrect name and phone nummber', async () => {
// 	const date: CreateRequestCallModel = { userName: ' ', phoneNumber: '12345ssd6789011' };
// 	await request(app)
// 		.post('/request_call')
// 		.send(date)
// 		.expect(HTTP_STATUSES.BAD_REQUEST_400);
// 	await request(app)
// 		.get('/request_call')
// 		.expect(HTTP_STATUSES.OK_200, [])
// });
// it('should user with correct name', async () => {
// 	const TEST_USER_1 = 'TestUser1';
// 	const TEST_TEL_NUM1 = '123456789011';
// 	const date: CreateRequestCallModel = { userName: TEST_USER_1, phoneNumber: TEST_TEL_NUM1 };
// 	const createDate = await request(app)
// 		.post('/request_call')
// 		.send(date)
// 		.expect(HTTP_STATUSES.CREATED_201);
// 	const createRequestCall = createDate.body;
// 	expect(createRequestCall).toEqual({
// 		id: expect.any(Number),
// 		userName: TEST_USER_1,
// 		phoneNumber: TEST_TEL_NUM1,
// 	});
// 	await request(app)
// 		.get('/request_call')
// 		.expect(HTTP_STATUSES.OK_200, [createRequestCall])
// 	await request(app)
// 		.delete('/request_call/' + createRequestCall.id)
// 		.expect(HTTP_STATUSES.NO_CONTENT_204);
// 	await request(app)
// 		.get('/request_call')
// 		.expect(HTTP_STATUSES.OK_200, [])
// });
// it('should return 405 when PUT used ', async () => {
// 	await request(app)
// 		.put('/request_call')
// 		.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
// });
// it('should return 405 when PUT used  when there is a URI parameter', async () => {
// 	await request(app)
// 		.put('/request_call/ksksjsjj11818')
// 		.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
// });
// it('should`nt  delete call  with incorrect id', async () => {
// 	await request(app)
// 		.delete('/request_call/' + -4545645)
// 		.expect(HTTP_STATUSES.NOT_FOUND_404);
// });
// });

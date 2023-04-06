"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const db_1 = require("../../src/db/db");
const HTTP_Status_1 = require("../../src/HTTP_Status/HTTP_Status");
describe('/request_call', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const renameDBBeforTest = yield db_1.db.query(`ALTER TABLE request_call RENAME TO request_call_test;`);
        const cleateTestDb = yield db_1.db.query(`create TABLE request_call(
				id SERIAL PRIMARY KEY,
				user_name VARCHAR(255),
				tel_number VARCHAR(12),
				is_not_processed BOOLEAN
				);`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const delDb = yield db_1.db.query(`DROP TABLE IF EXISTS request_call;`);
        const renameTestDb = yield db_1.db.query(`ALTER TABLE request_call_test RENAME TO request_call;`);
    }));
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and specified data', () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = {
            userName: 'Test User',
            phoneNumber: '012345678901',
        };
        const addTestDataToDb = yield db_1.db.query(`INSERT INTO request_call(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) ;`, [testData.userName, testData.phoneNumber]);
        const getData = yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200);
        const getDataBody = getData.body;
        expect(getDataBody).toEqual([Object.assign({ id: expect.any(Number) }, testData)]);
        const cleareDb = yield db_1.db.query(`TRUNCATE request_call;`);
    }));
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
});

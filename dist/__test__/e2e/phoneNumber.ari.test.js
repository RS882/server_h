"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const APIMethods_1 = require("../../src/API_Methods/APIMethods");
const app_1 = require("../../src/app");
const HTTP_Status_1 = require("../../src/HTTP_Status/HTTP_Status");
const db_1 = require("../../src/db/db");
describe('/phone_number', () => {
    const testPhoneNumber = '058098098098';
    beforeAll(async () => {
        const renameDBBeforTest = await db_1.db.query(`ALTER TABLE tel_number RENAME TO tel_number_test;`);
        const cleateTestDb = await db_1.db.query(`create TABLE tel_number(
			id SERIAL PRIMARY KEY,
			tel_number VARCHAR(12),
			is_aktive BOOLEAN
		);`);
        const addTestDataToDb = await db_1.db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);
    });
    afterAll(async () => {
        const delDb = await db_1.db.query(`DROP TABLE IF EXISTS tel_number;`);
        const renameTestDb = await db_1.db.query(`ALTER TABLE tel_number_test RENAME TO tel_number;`);
    });
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and specified data ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber });
    });
    it('should return 200 and specified data when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get('/phone_number/isdio1020')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber });
    });
    it('should return 405 when POST used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .post('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.POST));
    });
    it('should return 405 when PUT used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('should return 405 when PUT used  when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/phone_number/ksksjsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('should return 405 when DELETE used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .delete('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    });
    it('should return 405 when DELETE used  when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .delete('/phone_number/ksksuuuiijsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    });
});

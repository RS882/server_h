"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const APIMethods_1 = require("../../../../API_Methods/APIMethods");
const app_1 = require("../../../../app");
const HTTP_Status_1 = require("../../../../HTTP_Status/HTTP_Status");
const db_1 = require("../../../../db/db");
describe('/citys_list', () => {
    beforeAll(async () => {
        const cleateTestDb = await db_1.db.query(`create TABLE city(
			id SERIAL PRIMARY KEY,
			city_name VARCHAR(255),
			is_aktive BOOLEAN
			);`);
    });
    afterAll(async () => {
        const delDb = await db_1.db.query(`DROP TABLE IF EXISTS city;`);
    });
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and specified data ', async () => {
        const testCityName = 'London';
        const addTestDataToDb = await db_1.db.query(`INSERT INTO city(city_name , is_aktive) values ($1, $2);`, [testCityName, true]);
        await (0, supertest_1.default)(app_1.app)
            .get('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { citysList: [testCityName] });
        const cleareDb = await db_1.db.query(`TRUNCATE city;`);
    });
    it('should return 200 and specified data when there is a URI parameter', async () => {
        const testCityName = 'London';
        const addTestDataToDb = await db_1.db.query(`INSERT INTO city(city_name , is_aktive) values ($1, $2);`, [testCityName, true]);
        await (0, supertest_1.default)(app_1.app)
            .get('/citys_list/' + -20)
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { citysList: [testCityName] });
        const cleareDb = await db_1.db.query(`TRUNCATE city;`);
    });
    it('should return 405 when POST used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .post('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.POST));
    });
    it('should return 405 when PUT used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('should return 405 when PUT used  when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put('/citys_list/' + -20)
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    });
    it('should return 405 when DELETE used ', async () => {
        await (0, supertest_1.default)(app_1.app)
            .delete('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    });
    it('should return 405 when DELETE used  when there is a URI parameter', async () => {
        await (0, supertest_1.default)(app_1.app)
            .delete('/citys_list/' + -20)
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    });
});
// describe('/citys_list', () => {
// 	beforeAll(async () => {
// 		await request(app).delete('/__test__/city')
// 	});
// 	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;
// 	it('should return 200 and specified data ', async () => {
// 		await request(app)
// 			.get('/citys_list')
// 			.expect(HTTP_STATUSES.OK_200, { citysList: [] })
// 	});
// 	it('should return 200 and emty line when there is a URI parameter', async () => {
// 		await request(app)
// 			.get('/citys_list/isdio1020')
// 			.expect(HTTP_STATUSES.OK_200, { citysList: [] })
// 	});
// 	it('should return 405 when POST used ', async () => {
// 		await request(app)
// 			.post('/citys_list')
// 			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.POST))
// 	});
// 	it('should return 405 when PUT used ', async () => {
// 		await request(app)
// 			.put('/citys_list')
// 			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
// 	});
// 	it('should return 405 when PUT used  when there is a URI parameter', async () => {
// 		await request(app)
// 			.put('/citys_list/ksksjsjj11818')
// 			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
// 	});
// 	it('should return 405 when DELETE used ', async () => {
// 		await request(app)
// 			.delete('/citys_list')
// 			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
// 	});
// 	it('should return 405 when DELETE used  when there is a URI parameter', async () => {
// 		await request(app)
// 			.delete('/citys_list/ksksuuuiijsjj11818')
// 			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
// 	});
// });

import request from "supertest"
import { API_METHODS } from "../../API_Methods/APIMethods";
import { app } from "../../app";
import { HTTP_STATUSES } from "../../HTTP_Status/HTTP_Status";
import { db } from '../../db/db';




describe('/phone_number', () => {

	const testPhoneNumber = '058098098098';

	beforeAll(async () => {
		const renameDBBeforTest = await db.query(`ALTER TABLE tel_number RENAME TO tel_number_test;`);
		const cleateTestDb = await db.query(
			`create TABLE tel_number(
			id SERIAL PRIMARY KEY,
			tel_number VARCHAR(12),
			is_aktive BOOLEAN
		);`);
		const addTestDataToDb =
			await db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);
	});

	afterAll(async () => {
		const delDb = await db.query(`DROP TABLE IF EXISTS tel_number;`);
		const renameTestDb = await db.query(`ALTER TABLE tel_number_test RENAME TO tel_number;`);
	});

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;


	it('should return 200 and specified data ', async () => {
		await request(app)
			.get('/phone_number')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber })
	});

	it('should return 200 and specified data when there is a URI parameter', async () => {
		await request(app)
			.get('/phone_number/isdio1020')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber })
	});

	it('should return 405 when POST used ', async () => {
		await request(app)
			.post('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.POST))
	});

	it('should return 405 when PUT used ', async () => {
		await request(app)
			.put('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should return 405 when PUT used  when there is a URI parameter', async () => {
		await request(app)
			.put('/phone_number/ksksjsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should return 405 when DELETE used ', async () => {
		await request(app)
			.delete('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
	});

	it('should return 405 when DELETE used  when there is a URI parameter', async () => {
		await request(app)
			.delete('/phone_number/ksksuuuiijsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
	});
});

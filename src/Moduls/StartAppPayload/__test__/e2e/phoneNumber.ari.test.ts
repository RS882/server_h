import request from "supertest"
import { db } from './../../../../db/db';
import { app } from './../../../../app';
import { HTTP_STATUSES } from './../../../../HTTP_Status/HTTP_Status';
import { API_METHODS } from './../../../../API_Methods/APIMethods';





describe('/phone_number', () => {



	beforeAll(async () => {
		const cleateTestDb = await db.query(
			`create TABLE tel_number(
			id SERIAL PRIMARY KEY,
			tel_number VARCHAR(12),
			is_aktive BOOLEAN
		);`);

	});

	afterAll(async () => {
		const delDb = await db.query(`DROP TABLE IF EXISTS tel_number;`);

	});

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;


	it('should return 200 and specified data ', async () => {
		const testPhoneNumber = '058098098098';
		const addTestDataToDb =
			await db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);
		await request(app)
			.get('/phone_number')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber })
		const cleareDb = await db.query(`TRUNCATE tel_number;`);
	});

	it('should return 200 and specified data when there is a URI parameter', async () => {
		const testPhoneNumber = '058098098098';
		const addTestDataToDb =
			await db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);
		await request(app)
			.get('/phone_number/isdio1020')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber });
		const cleareDb = await db.query(`TRUNCATE tel_number;`);
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

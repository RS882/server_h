import request from "supertest"
import { API_METHODS } from "../../../../API_Methods/APIMethods";
import { app } from "../../../../app";
import { db } from "../../../../db/db";
import { HTTP_STATUSES } from "../../../../HTTP_Status/HTTP_Status";
import { APIRequestCallModel } from '../../Models/APIModels/APIRequestCallModel';
import { QueryResult } from 'pg';
import { SQLRequestCallIdModel } from '../../Models/SQLModels/SQLRequestCallIdModel';
import { env } from "process";



describe('/request_call', () => {

	const requestcallDbName = env.REQUEST_CALL_DB_NAME!;

	beforeAll(async () => {

		const cleateTestDb = await db.query(
			`create TABLE ${requestcallDbName}(
				id SERIAL PRIMARY KEY,
				user_name VARCHAR(255),
				tel_number VARCHAR(12),
				is_not_processed BOOLEAN
				);`);
	});

	afterAll(async () => {
		const delTestDb = await db.query(`DROP TABLE IF EXISTS ${requestcallDbName};`);

	});

	afterEach(async () => {
		const cleareDb = await db.query(`TRUNCATE ${requestcallDbName};`);
	})
	//========================================
	const postAndGetTestData = async (testData: APIRequestCallModel) => {
		await request(app)
			.post('/request_call')
			.send(testData)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.NOT_FOUND_404)
	};

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;
	//---------------------------------------
	it('GET :should return 200 and specified data', async () => {
		const testData: APIRequestCallModel = {
			userName: 'Test User',
			phoneNumber: '012345678901',
		};
		const addTestDataToDb =
			await db.query(`INSERT INTO ${requestcallDbName}(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) ;`, [testData.userName, testData.phoneNumber]);
		const getData = await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200);
		const getDataBody = getData.body;
		expect(getDataBody).toEqual([{
			id: expect.any(Number),
			...testData,
		}])


	});

	it('GET :should return 404 if there is no data', async () => {
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});

	it('GET :should return 404 when there is intcorrect URI parameter', async () => {
		await request(app)
			.get('/request_call/iwuu180')
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});

	it('GET :should return 200 and specified data when there is correct URI parameter', async () => {
		const testData: APIRequestCallModel = {
			userName: 'Test User',
			phoneNumber: '012345678901',
		};
		const addTestDataToDb: QueryResult<SQLRequestCallIdModel> =
			await db.query(`INSERT INTO ${requestcallDbName}(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) RETURNING id;`, [testData.userName, testData.phoneNumber]);
		const createdDataId = addTestDataToDb.rows[0].id;
		const getData = await request(app)
			.get(`/request_call/${createdDataId}`)
			.expect(HTTP_STATUSES.OK_200);
		const getDataBody = getData.body;
		expect(getDataBody).toEqual({
			id: createdDataId,
			...testData,
		})


	});
	it('PUT: should return 405 when PUT used ', async () => {
		await request(app)
			.put('/request_call')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('PUT:should return 405 when PUT used  when there is a URI parameter', async () => {
		await request(app)
			.put('/request_call/ksksjsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('POST: should`nt request call with intcorrect name ', async () => {
		let testData: APIRequestCallModel = { userName: '', phoneNumber: '123456789011' };
		await postAndGetTestData(testData);
		testData.userName = ' ';
		await postAndGetTestData(testData);

	});

	it('POST: should`nt request call with intcorrect phone number', async () => {
		const testData: APIRequestCallModel = { userName: 'John', phoneNumber: '128r98771' };
		await postAndGetTestData(testData);
	});



	it('POST: should request call with correct data', async () => {
		const testData: APIRequestCallModel = {
			userName: 'Test User',
			phoneNumber: '012345678901',
		};
		const createData = await request(app)
			.post('/request_call')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);
		const createdDataBody = createData.body;
		expect(createdDataBody).toEqual({ ...testData, })

	});

	it('POST: should return 500 if it is not possible to create a record on the server', async () => {
		const delDbForTest = await db.query(`DROP TABLE IF EXISTS request_call;`);
		const testData: APIRequestCallModel = { userName: 'John', phoneNumber: '012012012012' };
		await request(app)
			.post('/request_call')
			.send(testData)
			.expect(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
		const cleateTestDb = await db.query(
			`create TABLE ${requestcallDbName}(
					id SERIAL PRIMARY KEY,
					user_name VARCHAR(255),
					tel_number VARCHAR(12),
					is_not_processed BOOLEAN
					);`);
	});

	it('DELETE :should return 404 when there is intcorrect URI parameter', async () => {
		const getData1 = await request(app)
			.delete('/request_call/iwuu180')
			.expect(HTTP_STATUSES.NOT_FOUND_404);
		const getData2 = await request(app)
			.delete('/request_call/33')
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});

	it('DELETE :should return 204 when there is correct URI parameter', async () => {
		const testData: APIRequestCallModel = {
			userName: 'Test User',
			phoneNumber: '012345678901',
		};
		const addTestDataToDb: QueryResult<SQLRequestCallIdModel> =
			await db.query(`INSERT INTO ${requestcallDbName}(user_name, tel_number, is_not_processed)
			 values ($1, $2,true) RETURNING id;`, [testData.userName, testData.phoneNumber]);
		const createdDataId = addTestDataToDb.rows[0].id;
		const deleteData = await request(app)
			.delete(`/request_call/${createdDataId}`)
			.expect(HTTP_STATUSES.NO_CONTENT_204);

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
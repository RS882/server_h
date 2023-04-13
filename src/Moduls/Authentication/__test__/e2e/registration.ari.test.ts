import request from "supertest"
import { APIUserLoginModel } from "../../Models/APIModels/APIUserLoginModel";
import { app } from "../../../../app";
import { HTTP_STATUSES } from "../../../../HTTP_Status/HTTP_Status";
import { errorMessage } from "../../../../ErrorMessage/errorMessage";
import { APIUserRegModel } from "../../Models/APIModels/APIUserRegModel";
import { db } from "../../../../db/db";






describe('/auth', () => {

	beforeAll(async () => {
		const createUserAuthTestTab = await db.query(
			`CREATE TABLE user_auth(
				id SERIAL PRIMARY KEY,
				email VARCHAR(255) UNIQUE NOT NULL,
				pasword VARCHAR(255) NOT NULL,
				is_activated BOOLEAN DEFAULT false,
				activation_link  VARCHAR(255)
				);`
		);

		const createTokenTestTab = await db.query(
			`CREATE TABLE token(
				id SERIAL PRIMARY KEY,
				refresh_token VARCHAR(500) NOT NULL,
				user_ip_aderss VARCHAR(255),
				user_id integer,
				FOREIGN KEY (user_id) REFERENCES user_auth(id) ON DELETE CASCADE
			);`
		);
	});

	afterAll(async () => {
		const delUserAuthTestTab = await db.query(`DROP TABLE IF EXISTS user_auth cascade;`);
		const delTokenTestTab = await db.query(`DROP TABLE IF EXISTS token;`);


	});


	const setBadData = async (payload: APIUserLoginModel) => {
		const getReq = await request(app)
			.post('/auth/registration')
			.send(payload)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		expect(getReq.text).toEqual(errorMessage.INVALID_CHATACTER);
	};

	it('POST: should return 400 and text  with intcorrect email ', async () => {
		let testData: APIUserLoginModel = { userEmail: '11', userPassword: '123456789011' };
		await setBadData(testData);
		testData.userEmail = '';
		await setBadData(testData);
	});
	it('POST: should return 400 and text  with intcorrect password ', async () => {
		let testData: APIUserLoginModel = { userEmail: 'wetrw@iuo.com', userPassword: '' };
		await setBadData(testData);
		testData.userPassword = ' 122 tyyu ';
		await setBadData(testData);
	});
	it('POST: should retrurn 201 and  user data with correct data', async () => {
		const testData: APIUserLoginModel = { userEmail: '693ht2@iuo.com', userPassword: '12utrc345' };
		const getReq = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);
		const getReqBodyUser: APIUserRegModel = getReq.body;
		expect(getReqBodyUser.user.email).toEqual(testData.userEmail);
		const delTestData = await db.query(`DELETE FROM user_auth  where id = ${getReqBodyUser.user.id};`);
	});

	// it('POST: should`nt request call with intcorrect phone number', async () => {
	// 	const testData: APIRequestCallModel = { userName: 'John', phoneNumber: '128r98771' };
	// 	await postAndGetTestData(testData);
	// });

	// it('POST: should return 500 if it is not possible to create a record on the server', async () => {
	// 	const delDbForTest = await db.query(`DROP TABLE IF EXISTS request_call;`);
	// 	const testData: APIRequestCallModel = { userName: 'John', phoneNumber: '012012012012' };
	// 	await request(app)
	// 		.post('/request_call')
	// 		.send(testData)
	// 		.expect(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
	// 	const cleateTestDb = await db.query(
	// 		`create TABLE request_call(
	// 				id SERIAL PRIMARY KEY,
	// 				user_name VARCHAR(255),
	// 				tel_number VARCHAR(12),
	// 				is_not_processed BOOLEAN
	// 				);`);
	// });

	// it('POST: should request call with correct data', async () => {
	// 	const testData: APIRequestCallModel = {
	// 		userName: 'Test User',
	// 		phoneNumber: '012345678901',
	// 	};
	// 	const createData = await request(app)
	// 		.post('/request_call')
	// 		.send(testData)
	// 		.expect(HTTP_STATUSES.CREATED_201);
	// 	const createdDataBody = createData.body;
	// 	expect(createdDataBody).toEqual({ ...testData, })
	// 	const cleareDb = await db.query(`TRUNCATE request_call;`);
	// });

	// it('DELETE :should return 404 when there is intcorrect URI parameter', async () => {
	// 	const getData1 = await request(app)
	// 		.delete('/request_call/iwuu180')
	// 		.expect(HTTP_STATUSES.NOT_FOUND_404);
	// 	const getData2 = await request(app)
	// 		.delete('/request_call/33')
	// 		.expect(HTTP_STATUSES.NOT_FOUND_404);
	// });

	// it('DELETE :should return 204 when there is correct URI parameter', async () => {
	// 	const testData: APIRequestCallModel = {
	// 		userName: 'Test User',
	// 		phoneNumber: '012345678901',
	// 	};
	// 	const addTestDataToDb: QueryResult<SQLRequestCallIdModel> =
	// 		await db.query(`INSERT INTO request_call(user_name, tel_number, is_not_processed)
	// 		 values ($1, $2,true) RETURNING id;`, [testData.userName, testData.phoneNumber]);
	// 	const createdDataId = addTestDataToDb.rows[0].id;
	// 	const deleteData = await request(app)
	// 		.delete(`/request_call/${createdDataId}`)
	// 		.expect(HTTP_STATUSES.NO_CONTENT_204);
	// 	const cleareDb = await db.query(`TRUNCATE request_call;`);
	// });

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
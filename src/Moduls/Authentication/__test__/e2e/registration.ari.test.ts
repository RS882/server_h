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

	it('POST: should retrurn 500 and error message  if email is duplicated', async () => {
		const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };

		const getReq1 = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);
		const getReqBodyUser = getReq1.body;
		const getReq2 = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
		expect(getReq2.text)
			.toEqual(errorMessage.REPETITION_EMAIL[0] + ` ${testData.userEmail} ` + errorMessage.REPETITION_EMAIL[1]);
		const delTestData = await db.query(`DELETE FROM user_auth  where id = ${getReqBodyUser.user.id};`);
	});

	it('POST: should retrurn 500  if some server error', async () => {
		const delUserAuthTestTab = await db.query(`DROP TABLE IF EXISTS user_auth cascade;`);
		const createUserAuthTestTab = await db.query(
			`CREATE TABLE user11_auth(
				id SERIAL PRIMARY KEY,
				email VARCHAR(255) UNIQUE NOT NULL,
				pasword VARCHAR(255) NOT NULL,
				is_activated BOOLEAN DEFAULT false,
				activation_link  VARCHAR(255)
				);`
		);
		const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
		await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
		const delUserAuthTest2Tab = await db.query(`DROP TABLE IF EXISTS user11_auth cascade;`);

	});


});

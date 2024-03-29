import request from "supertest"
import { APIUserLoginModel } from "../../Models/APIModels/APIUserLoginModel";
import { app } from "../../../../app";
import { HTTP_STATUSES } from "../../../../HTTP_Status/HTTP_Status";
import { errorMessage } from "../../../../ErrorMessage/errorMessage";
import { APIUserModel } from "../../Models/APIModels/APIUserRegModel";
import { db } from "../../../../db/db";
import { UserDTOModel } from "../../Models/UserDTOModel";
import { env } from "process";



describe('/auth', () => {

	const tokenDbName = env.TOKEN_DB_NAME!;
	const userAuthDbName = env.USER_AUTH_DB_NAME!;

	beforeAll(async () => {
		const createUserAuthTestTab = await db.query(
			`CREATE TABLE ${userAuthDbName}(
				id SERIAL PRIMARY KEY,
				email VARCHAR(255) UNIQUE NOT NULL,
				pasword VARCHAR(255) NOT NULL,
				is_activated BOOLEAN DEFAULT false,
				activation_link  VARCHAR(255)
				);`
		);

		const createTokenTestTab = await db.query(
			`CREATE TABLE ${tokenDbName}(
				id SERIAL PRIMARY KEY,
				refresh_token VARCHAR(500) NOT NULL,
				user_ip_aderss VARCHAR(255),
				user_id integer,
				FOREIGN KEY (user_id) REFERENCES ${userAuthDbName}(id) ON DELETE CASCADE
			);`
		);
	});

	afterAll(async () => {
		const delUserAuthTestTab = await db.query(`DROP TABLE IF EXISTS ${userAuthDbName} cascade;`);
		const delTokenTestTab = await db.query(`DROP TABLE IF EXISTS ${tokenDbName};`);
	});
	afterEach(async () => {
		const delTestData = await db.query(`TRUNCATE ${userAuthDbName} CASCADE;`);
	});


	const setBadData = async (payload: APIUserLoginModel) => {
		const getReq = await request(app)
			.post('/auth/registration')
			.send(payload)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);

		expect(getReq.body).toEqual({
			message: errorMessage.INVALID_CHATACTER,
			errors: expect.any(Array),
		}


		);
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
	it('POST: should return 201 and  user data with correct data', async () => {
		const testData: APIUserLoginModel = { userEmail: '693ht2@iuo.com', userPassword: '12utrc345' };
		const getReq = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);

		const getReqBodyUser: APIUserModel = getReq.body;
		expect(getReqBodyUser.user.email).toEqual(testData.userEmail);

		const logout = await request(app)
			.post('/auth/logout')
			.set('Cookie', getReq.headers['set-cookie'])
			.expect(HTTP_STATUSES.OK_200);


	});

	it('POST: should return 400 and error message  if email is duplicated', async () => {
		const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };

		const getReq1 = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);
		const getReqBodyUser = getReq1.body;
		const getReq2 = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);


		expect(getReq2.body)
			.toEqual({
				message: errorMessage.REPETITION_EMAIL[0] + ` ${testData.userEmail} ` + errorMessage.REPETITION_EMAIL[1],
				errors: [],
			}

			);

	});

	it('POST: should return 400 and error message  if incorrect activation link', async () => {
		const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
		const getReq1 = await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.CREATED_201);
		const getReqBodyUser = getReq1.body;
		const getReq2 = await request(app)
			.get('/auth/activate/1111')
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		expect(getReq2.body)
			.toEqual({
				message: errorMessage.INCORRECT_ACTIVATION_LINK,
				errors: [],
			});

	});



	it('POST: should return 400 and error message  if user with this email no found',
		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };

			const getReq1 = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getReqBodyUser = getReq1.body;
			const testData2: APIUserLoginModel = { userEmail: 'yyyyy@u7po.zt', userPassword: 'U&t8ii' };
			const getReq2 = await request(app)
				.post('/auth/login')
				.send(testData2)
				.expect(HTTP_STATUSES.BAD_REQUEST_400);
			expect(getReq2.body)
				.toEqual({
					message: errorMessage.USER_NOT_FOUND,
					errors: [],
				}

				);

		});

	it('POST: should return 400 and error message  if user password incorrect',
		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };

			const getReq1 = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getReqBodyUser = getReq1.body;
			const testData2: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'U&t8ii' };
			const getReq2 = await request(app)
				.post('/auth/login')
				.send(testData2)
				.expect(HTTP_STATUSES.BAD_REQUEST_400);
			expect(getReq2.body)
				.toEqual({
					message: errorMessage.INCORRECT_PASSWORD,
					errors: [],
				}

				);

		});

	it('POST: should return 200 and object  if user correct logout ',
		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const logout = await request(app)
				.post('/auth/logout')
				.set('Cookie', getLogin.headers['set-cookie'])
				.expect(HTTP_STATUSES.OK_200);

			expect(logout.body)
				.toEqual({
					id: expect.any(Number),
					userId: getLogin.body.user.id,
					refreshToken: getLogin.body.refreshToken,
					userIPAdress: null && expect.any(String),
				});

		});


	it('GET: should return 201 and  user data when  correct token refresh ',

		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLoginBody: APIUserModel = getLogin.body;

			const refreshData = await request(app)
				.get('/auth/refresh')
				.set('Cookie', getLogin.headers['set-cookie'])
				.expect(HTTP_STATUSES.CREATED_201);

			const getReqBodyUser: APIUserModel = refreshData.body;
			expect(getReqBodyUser.user).toEqual(getLoginBody.user);
			expect(getReqBodyUser.accessToken).not.toEqual(getLoginBody.accessToken);
			expect(getReqBodyUser.refreshToken).not.toEqual(getLoginBody.refreshToken);


		});

	it('GET: should return 401 if refresh token incorrect ',

		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLoginBody: APIUserModel = getLogin.body;

			const refreshDataWithoutToken = await request(app)
				.get('/auth/refresh')
				.expect(HTTP_STATUSES.UNAUTHORIZED_401);

			const refreshDataWithIncorrectToken = await request(app)
				.get('/auth/refresh')
				.set('Cookie', 'iaoisjdl12i2i3')
				.expect(HTTP_STATUSES.UNAUTHORIZED_401);


		});


	it('GET: should return 401 if refresh token correct but it is not in the database',

		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const delTestTokenData = await db.query(`TRUNCATE ${tokenDbName} CASCADE;`);

			const refreshData = await request(app)
				.get('/auth/refresh')
				.set('Cookie', getLogin.headers['set-cookie'])
				.expect(HTTP_STATUSES.UNAUTHORIZED_401);


		});
	it('GET: should return 401 if refresh token correct but it is not in the database',
		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const delTestTokenData = await db.query(`TRUNCATE ${tokenDbName} CASCADE;`);

			const refreshData = await request(app)
				.get('/auth/refresh')
				.set('Cookie', getLogin.headers['set-cookie'])
				.expect(HTTP_STATUSES.UNAUTHORIZED_401);

		});

	it('GET: should return 401 if headres without authorization',
		async () => {
			const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
			const getReq = await request(app)
				.post('/auth/registration')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const getLogin = await request(app)
				.post('/auth/login')
				.send(testData)
				.expect(HTTP_STATUSES.CREATED_201);

			const accessToken = getLogin.body.accessToken
			const refreshData = await request(app)
				.get('/auth/users')
				.set('Authorization', `Bearer ${accessToken}`)
				.expect(HTTP_STATUSES.OK_200);

			const getReqBodyUser: UserDTOModel[] = refreshData.body;
			expect(getReqBodyUser[0].email).toEqual(testData.userEmail);

		});

	it('POST: should return 500  if some server error', async () => {
		const delUserAuthTestTab = await db.query(`DROP TABLE IF EXISTS ${userAuthDbName} cascade;`);

		const testData: APIUserLoginModel = { userEmail: 'abc2@u7po.zt', userPassword: 'Tj28ii' };
		await request(app)
			.post('/auth/registration')
			.send(testData)
			.expect(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);

		const createUserAuthTestTab = await db.query(
			`CREATE TABLE ${userAuthDbName}(
					id SERIAL PRIMARY KEY,
					email VARCHAR(255) UNIQUE NOT NULL,
					pasword VARCHAR(255) NOT NULL,
					is_activated BOOLEAN DEFAULT false,
					activation_link  VARCHAR(255)
					);`
		);
	});

});




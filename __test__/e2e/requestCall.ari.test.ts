import request from "supertest"
import { API_METHODS } from "../../src/API_Methods/APIMethods";
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/HTTP_Status/HTTP_Status";

import { CreateRequestCallModel } from '../../src/models/CreateRequestCall';



describe('/request_call', () => {

	beforeAll(async () => {
		await request(app).delete('/__test__/call')
	});

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

	it('should return 200 and emty array', async () => {
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should return 200 and an empty array when there is any URI parameter', async () => {
		await request(app)
			.get('/request_call/8sjsj2ha99asj')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should`nt user with intcorrect name', async () => {
		const date: CreateRequestCallModel = { userName: '', phoneNumber: '123456789011' };
		await request(app)
			.post('/request_call')
			.send(date)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [])
	});

	it('should`nt user with intcorrect phone nummber', async () => {
		const date: CreateRequestCallModel = { userName: 'Jhon', phoneNumber: '12345ssd6789011' };
		await request(app)
			.post('/request_call')
			.send(date)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should`nt user with intcorrect name and phone nummber', async () => {
		const date: CreateRequestCallModel = { userName: ' ', phoneNumber: '12345ssd6789011' };
		await request(app)
			.post('/request_call')
			.send(date)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should user with correct name', async () => {
		const TEST_USER_1 = 'TestUser1';
		const TEST_TEL_NUM1 = '123456789011';
		const date: CreateRequestCallModel = { userName: TEST_USER_1, phoneNumber: TEST_TEL_NUM1 };

		const createDate = await request(app)
			.post('/request_call')
			.send(date)
			.expect(HTTP_STATUSES.CREATED_201);

		const createRequestCall = createDate.body;

		expect(createRequestCall).toEqual({
			id: expect.any(Number),
			userName: TEST_USER_1,
			phoneNumber: TEST_TEL_NUM1,
		});

		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [createRequestCall])
		await request(app)
			.delete('/request_call/' + createRequestCall.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/request_call')
			.expect(HTTP_STATUSES.OK_200, [])
	});

	it('should return 405 when PUT used ', async () => {
		await request(app)
			.put('/request_call')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should return 405 when PUT used  when there is a URI parameter', async () => {
		await request(app)
			.put('/request_call/ksksjsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should`nt  delete call  with incorrect id', async () => {
		await request(app)
			.delete('/request_call/' + -4545645)
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});


});
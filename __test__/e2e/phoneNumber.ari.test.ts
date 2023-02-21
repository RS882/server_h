import request from "supertest"
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/HTTP_Status/HTTP_Status";



describe('/phone_number', () => {

	beforeAll(async () => {
		await request(app).delete('/__test__/data')
	});

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

	it('should return 200 and emty line ', async () => {
		await request(app)
			.get('/phone_number')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: '' })
	});

	it('should return 200 and emty line when there is a URI parameter', async () => {
		await request(app)
			.get('/phone_number/isdio1020')
			.expect(HTTP_STATUSES.OK_200, { phoneNumber: '' })
	});

	it('should return 405 when POST used ', async () => {
		await request(app)
			.post('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText('POST'))
	});

	it('should return 405 when PUT used ', async () => {
		await request(app)
			.put('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText('PUT'))
	});

	it('should return 405 when PUT used  when there is a URI parameter', async () => {
		await request(app)
			.put('/phone_number/ksksjsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText('PUT'))
	});

	it('should return 405 when DELETE used ', async () => {
		await request(app)
			.delete('/phone_number')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText('DELETE'))
	});

	it('should return 405 when DELETE used  when there is a URI parameter', async () => {
		await request(app)
			.delete('/phone_number/ksksuuuiijsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText('DELETE'))
	});


});
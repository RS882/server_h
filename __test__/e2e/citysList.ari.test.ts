import request from "supertest"
import { API_METHODS } from "../../src/API_Methods/APIMethods";
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/HTTP_Status/HTTP_Status";



describe('/citys_list', () => {

	beforeAll(async () => {
		await request(app).delete('/__test__/city')
	});

	const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

	it('should return 200 and emty line ', async () => {
		await request(app)
			.get('/citys_list')
			.expect(HTTP_STATUSES.OK_200, { citysList: [] })
	});

	it('should return 200 and emty line when there is a URI parameter', async () => {
		await request(app)
			.get('/citys_list/isdio1020')
			.expect(HTTP_STATUSES.OK_200, { citysList: [] })
	});

	it('should return 405 when POST used ', async () => {
		await request(app)
			.post('/citys_list')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.POST))
	});

	it('should return 405 when PUT used ', async () => {
		await request(app)
			.put('/citys_list')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should return 405 when PUT used  when there is a URI parameter', async () => {
		await request(app)
			.put('/citys_list/ksksjsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.PUT))
	});

	it('should return 405 when DELETE used ', async () => {
		await request(app)
			.delete('/citys_list')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
	});

	it('should return 405 when DELETE used  when there is a URI parameter', async () => {
		await request(app)
			.delete('/citys_list/ksksuuuiijsjj11818')
			.expect(HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(API_METHODS.DELETE))
	});


});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const APIMethods_1 = require("../../src/API_Methods/APIMethods");
const app_1 = require("../../src/app");
const HTTP_Status_1 = require("../../src/HTTP_Status/HTTP_Status");
describe('/request_call', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/__test__/call');
    }));
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and emty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 200 and an empty array when there is any URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call/8sjsj2ha99asj')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should`nt user with intcorrect name', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = { userName: '', phoneNumber: '123456789011' };
        yield (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(date)
            .expect(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should`nt user with intcorrect phone nummber', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = { userName: 'Jhon', phoneNumber: '12345ssd6789011' };
        yield (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(date)
            .expect(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should`nt user with intcorrect name and phone nummber', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = { userName: ' ', phoneNumber: '12345ssd6789011' };
        yield (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(date)
            .expect(HTTP_Status_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should user with correct name', () => __awaiter(void 0, void 0, void 0, function* () {
        const TEST_USER_1 = 'TestUser1';
        const TEST_TEL_NUM1 = '123456789011';
        const date = { userName: TEST_USER_1, phoneNumber: TEST_TEL_NUM1 };
        const createDate = yield (0, supertest_1.default)(app_1.app)
            .post('/request_call')
            .send(date)
            .expect(HTTP_Status_1.HTTP_STATUSES.CREATED_201);
        const createRequestCall = createDate.body;
        expect(createRequestCall).toEqual({
            id: expect.any(Number),
            userName: TEST_USER_1,
            phoneNumber: TEST_TEL_NUM1,
        });
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, [createRequestCall]);
        yield (0, supertest_1.default)(app_1.app)
            .delete('/request_call/' + createRequestCall.id)
            .expect(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 405 when PUT used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/request_call')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should return 405 when PUT used  when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/request_call/ksksjsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should`nt  delete call  with incorrect id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/request_call/' + -4545645)
            .expect(HTTP_Status_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
});

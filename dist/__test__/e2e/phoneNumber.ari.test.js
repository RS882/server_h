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
const db_1 = require("../../src/db/db");
describe('/phone_number', () => {
    const testPhoneNumber = '058098098098';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createTestDb = yield db_1.db.query(`CREATE TABLE tel_number_test AS TABLE tel_number;`);
        const cleareDb = yield db_1.db.query(`TRUNCATE tel_number;`);
        const addTestDataToDb = yield db_1.db.query(`INSERT INTO tel_number(tel_number, is_aktive) values ('${testPhoneNumber}',true);`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const delDb = yield db_1.db.query(`DROP TABLE IF EXISTS tel_number;`);
        const renameTestDb = yield db_1.db.query(`ALTER TABLE tel_number_test RENAME TO tel_number;`);
    }));
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and emty line ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber });
    }));
    it('should return 200 and emty line when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/phone_number/isdio1020')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { phoneNumber: testPhoneNumber });
    }));
    it('should return 405 when POST used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.POST));
    }));
    it('should return 405 when PUT used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should return 405 when PUT used  when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/phone_number/ksksjsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should return 405 when DELETE used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/phone_number')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    }));
    it('should return 405 when DELETE used  when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/phone_number/ksksuuuiijsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    }));
});

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
describe('/citys_list', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/__test__/city');
    }));
    const getMethodNotAllowdText = (method) => `The request method ${method} is inappropriate for this URL`;
    it('should return 200 and emty line ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { citysList: [] });
    }));
    it('should return 200 and emty line when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/citys_list/isdio1020')
            .expect(HTTP_Status_1.HTTP_STATUSES.OK_200, { citysList: [] });
    }));
    it('should return 405 when POST used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.POST));
    }));
    it('should return 405 when PUT used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should return 405 when PUT used  when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/citys_list/ksksjsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.PUT));
    }));
    it('should return 405 when DELETE used ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/citys_list')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    }));
    it('should return 405 when DELETE used  when there is a URI parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/citys_list/ksksuuuiijsjj11818')
            .expect(HTTP_Status_1.HTTP_STATUSES.METHOD_NOT_ALLOWED_405, getMethodNotAllowdText(APIMethods_1.API_METHODS.DELETE));
    }));
});
